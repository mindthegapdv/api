const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { NotFound } = require('../errors');
const { asyncify } = require('../utils');
// const { requireAuth } = require('../middleware');
const { Participant } = require('../models/groups');

const SECRET_KEY = process.env.SECRET_KEY || 'thisisnotsecret';

const createParticipantRouter = () => {
  const router = Router();
  router.get('/', asyncify(async (req, res) => {
    const participants = await Participant.findAll();
    res.send(participants);
  }));

  router.post('/:participantId/generate', asyncify(async (req, res) => {
    const participant = await Participant.findOne({ where: { id: req.params.participantId } });
    if (!participant) {
      throw NotFound();
    }
    const token = jwt.sign({ id: participant.id }, SECRET_KEY);
    res.json({ token });
  }));
  return router;
};

module.exports = { createParticipantRouter };
