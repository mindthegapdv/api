const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { NotFound, Unauthorized } = require('../errors');
const { asyncify } = require('../utils');
const { Participant } = require('../models/groups');
const { Order, OrderParticipant } = require('../models/order');

const SECRET_KEY = process.env.SECRET_KEY || 'thisisnotsecret';

const validateParticpantToken = (req, res, next) => {
  let token = req.headers.authorization; // Express headers are auto converted to lowercase
  if (!token) {
    throw Unauthorized();
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        throw Unauthorized();
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    throw Unauthorized();
  }
};

const serializeParticipantOrder = (order, orderParticipant) => ({
  id: order.id,
  status: orderParticipant.status,
  feedback: orderParticipant.feedback,
  orderStatus: order.status,
  location: order.location,
  menuDescription: order.menuDescription,
  dt_scheduled: order.dt_scheduled,
});

const getOrdersStatus = (orders) => orders
  .filter((order) => order.OrderParticipants.status === 0)
  .map((order) => serializeParticipantOrder(order, order.OrderParticipants));

const createProfileRouter = () => {
  const router = Router();
  router.get('/', validateParticpantToken, asyncify(async (req, res) => {
    const participant = await Participant.findOne({ where: { id: req.decoded.id } });
    if (!participant) {
      throw Unauthorized();
    }
    const orders = await participant.getOrders();
    const lastOrder = null;
    const profile = {
      id: participant.id,
      email: participant.email,
      lastOrder,
      dietaryRequirements: participant.dietaryRequirements,
      orders: getOrdersStatus(orders),
    };
    res.send(profile);
  }));

  // update order
  router.patch('/orders/:orderId', validateParticpantToken, asyncify(async (req, res) => {
    const orderParticipant = await OrderParticipant.findOne({
      where: {
        orderId: req.params.orderId,
        participantId: req.decoded.id,
      },
    });
    if (!orderParticipant) {
      throw NotFound();
    }
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    if (!order) {
      throw NotFound();
    }
    if (order.status === 'Feedback') {
      orderParticipant.feedback = req.body.feedback || orderParticipant.feedback;
    } else if (order.status === 'Open To Join') {
      orderParticipant.status = req.body.status || orderParticipant.status;
    }
    await orderParticipant.save();
    res.status(405).json(serializeParticipantOrder(order, orderParticipant));
  }));

  // update dietary requirements
  router.patch('/', validateParticpantToken, asyncify(async (req, res) => {
    res.status(405).json({ status: 'coming soon' });
  }));

  return router;
};

module.exports = { createProfileRouter };
