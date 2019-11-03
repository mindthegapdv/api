const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const ml = require('../services/ml');
const { NotFound } = require('../errors');
const { asyncify } = require('../utils');
// const { requireAuth } = require('../middleware');
const { Order, validStatus } = require('../models/order');
const { Group, Participant } = require('../models/groups');

const orderSchema = Joi.object().keys({
  menuDescription: Joi.string(),
  name: Joi.string().required(),
  dt_scheduled: Joi.date().iso().required(),
  location: Joi.string(),
  serviceProvider: Joi.number(),
  buffer: Joi.number(),
  participants: Joi.array().items(Joi.number()),
});

const addParticipantSchema = Joi.object().keys({
  participants: Joi.array().items(Joi.number()).required(),
});

const updateOrderSchema = Joi.object().keys({
  menuDescription: Joi.string(),
  name: Joi.string().required(),
  dt_scheduled: Joi.date().iso().required(),
  location: Joi.string(),
  serviceProvider: Joi.number(),
  buffer: Joi.number(),
  participants: Joi.array().items(Joi.number()),
  status: Joi.string().valid(...validStatus),
});

const serializeOrderParticipant = (participant) => ({
  id: participant.id,
  email: participant.email,
  dietaryRequirements: participant.dietaryRequirements,
  status: participant.OrderParticipants.status,
  groupName: participant.Group && participant.Group.name,
  groupCostCode: participant.Group && participant.Group.costCode,
});

const createOrderRouter = () => {
  const router = Router();
  router.get('/', asyncify(async (req, res) => {
    const orders = await Order.findAll();
    res.send(orders);
  }));

  router.post('/',
    celebrate({
      body: orderSchema,
    }), asyncify(async (req, res) => {
      const { participants, ...rest } = req.body;
      const order = await Order.build(rest);
      [order.status] = validStatus;
      const result = await order.save();
      if (participants) {
        order.addParticipants(participants, { through: { status: 0 } });
      }
      await ml.createOrder(order.id, order.dt_scheduled);
      res.json(result);
    }));

  // update an order
  router.patch('/:orderId',
    celebrate({
      body: updateOrderSchema,
    }),
    asyncify(async (req, res) => {
      const order = await Order.findOne({ where: { id: req.params.orderId } });
      if (!order) {
        throw NotFound();
      }
      order.status = req.body.status || order.status;
      order.menuDescription = req.body.menuDescription || order.menuDescription;
      order.buffer = req.body.buffer || order.buffer;
      order.location = req.body.location || order.location;
      order.serviceProvider = req.body.serviceProvider || order.serviceProvider;
      const result = await order.save();
      res.json(result);
    }));

  router.post('/:orderId/participants',
    celebrate({
      body: addParticipantSchema,
    }),
    asyncify(async (req, res) => {
      const order = await Order.findOne({ where: { id: req.params.orderId } });
      if (!order) {
        throw NotFound();
      }
      await Promise.all(req.body.participants.map(async (p) => {
        const participant = await Participant.findOne({ where: { id: p } });
        await order.addParticipant(p, { through: { status: 1 } });
        await ml.addParticipant(order.id, participant.email);
      }));
      const result = await order.addParticipants(req.body.participants, { through: { status: 1 } });
      res.json(result);
    }));

  router.get('/:orderId', asyncify(async (req, res) => {
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    if (!order) {
      throw NotFound();
    }
    const participants = await order
      .getParticipants({ include: [{ model: Group }] })
      .map((p) => serializeOrderParticipant(p));
    const result = {
      ...order.dataValues,
      participants,
      stats: {
        subTotal: participants.filter((p) => p.status === 1).length,
        grandTotal: participants.filter((p) => p.status === 1).length + (order.buffer || 0),
      },
    };
    res.send(result);
  }));
  return router;
};

module.exports = { createOrderRouter };
