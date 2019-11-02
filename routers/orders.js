const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { NotFound } = require('../errors');
const { asyncify } = require('../utils');
// const { requireAuth } = require('../middleware');
const { Order, validStatus } = require('../models/order');

const orderSchema = Joi.object().keys({
  menuDescription: Joi.string().required(),
  dt_scheduled: Joi.date().iso().required(),
  location: Joi.string().required(),
  serviceProvider: Joi.number().required(),
  buffer: Joi.number(),
  participants: Joi.array().items(Joi.number()),
});


const createOrderRouter = () => {
  const router = Router();
  router.get('/', asyncify(async (req, res) => {
    const orders = Order.findAll();
    res.send(orders);
  }));

  router.post('/', celebrate({
    body: orderSchema,
  }), asyncify(async (req, res) => {
    const { participants, ...rest } = req.body;
    const order = await Order.build(rest);
    [order.status] = validStatus;
    const result = await order.save();
    order.addParticipants(participants, { through: { status: 0 } });
    res.json(result);
  }));

  // update an order
  router.patch('/:orderId', asyncify(async (req, res) => {
    res.status(405).json({ status: 'coming soon' });
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
