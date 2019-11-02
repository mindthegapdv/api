const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { NotFound } = require('../errors');
const { asyncify } = require('../utils');
// const { requireAuth } = require('../middleware');
const { Group, Participant } = require('../models/groups');

const groupSchema = Joi.object().keys({
  name: Joi.string().min(1).max(30).required(),
  costCode: Joi.string().required(),
});

const participantSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  dietaryRequirements: Joi.string(),
});

const createGroupRouter = () => {
  const router = Router();
  // router.use(requireAuth);
  router.get('/', asyncify(async (req, res) => {
    const providers = await Group.findAll({ include: [{ model: Participant, as: 'participants' }] });
    return res.json(providers);
  }));

  router.post('/', celebrate({
    body: groupSchema,
  }), asyncify(async (req, res) => {
    const group = await Group.build(req.body);
    const result = await group.save();
    res.json(result);
  }));

  router.get('/:groupId', asyncify(async (req, res) => {
    const group = await Group.findOne({ where: { id: req.params.groupId } });
    if (!group) {
      throw NotFound();
    }
    res.send(group);
  }));

  router.get('/:groupId/participants', asyncify(async (req, res) => {
    const group = await Group.findOne({ where: { id: req.params.groupId } });
    if (!group) {
      throw NotFound();
    }
    const participants = await Participant.findAll({ where: { group: group.id } });
    res.send(participants);
  }));

  router.post('/:groupId/participants', celebrate({
    body: participantSchema,
  }), asyncify(async (req, res) => {
    const group = await Group.findOne({ where: { id: req.params.groupId } });
    if (!group) {
      throw NotFound();
    }
    const participant = await Participant.build({ ...req.body, group: group.id });
    const result = await participant.save();
    res.json(result);
  }));

  return router;
};

module.exports = { createGroupRouter };
