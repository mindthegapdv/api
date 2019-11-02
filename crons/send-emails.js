const jwt = require('jsonwebtoken');
const { Participant } = require('../models/groups');
const { sendTemplate } = require('../services/email');
const { sequelize } = require('../models');

const SECRET_KEY = process.env.SECRET_KEY || 'thisisnotsecret';

Participant.findAll().then((participants) => Promise.all(participants.map((participant) => {
  const token = jwt.sign({ id: participant.id }, SECRET_KEY);
  const url = `https://need2feed.us/preferences?token=${token}`;
  return sendTemplate(participant.email, 'Set your preferences', { action_url: url }, 'remind');
}))).then((results) => {
  console.log(results);
  sequelize.close();
});
