const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
const { asyncify } = require('../utils');
const Order = require('../models/order');
const { Participant } = require('../models/groups');

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

const createProfileRouter = () => {
  const router = Router();
  router.get('/', validateParticpantToken, asyncify(async (req, res) => {
    const participant = await Participant.findOne({ where: { id: req.decoded.id } });
    if (!participant) {
      throw Unauthorized();
    }
    const orders = await Order.findAll();
    const profile = {
      id: participant.id,
      dietaryRequirements: (participant.dietaryRequirements || '').split(','),
      orders: [],
    };
    res.send(profile);
  }));
  return router;
};

module.exports = { createProfileRouter };
