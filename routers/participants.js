const { Router } = require('express');
const { asyncify } = require('../utils');
// const { requireAuth } = require('../middleware');
const { Participant } = require('../models/groups');

const createParticipantRouter = () => {
  const router = Router();
  router.get('/', asyncify(async (req, res) => {
    const participants = await Participant.findAll();
    res.send(participants);
  }));
  return router;
};

module.exports = { createParticipantRouter };
