const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { NotFound } = require('../errors');
const { asyncify } = require('../utils');
// const { requireAuth } = require('../middleware');
const { Order, validStatus } = require('../models/order');

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
      const result = await order.addParticipants(req.body.participants, { through: { status: 0 } });
      res.json(result);
    }));

  router.get('/:orderId', asyncify(async (req, res) => {
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    if (!order) {
      throw NotFound();
    }
    const participants = await order.getParticipants();
    const result = {
      ...order.dataValues,
      participants: participants.map((p) => serializeOrderParticipant(p)),
    };
    res.send(result);
  }));
  return router;
};

module.exports = { createOrderRouter };
