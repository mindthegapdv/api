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
      res.json(order);
    }));

  router.get('/:orderId', asyncify(async (req, res) => {
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    if (!order) {
      throw NotFound();
    }
    res.send(order);
  }));
  return router;
};

module.exports = { createOrderRouter };
