/* eslint-disable max-classes-per-file  */
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('./index');

class Participant extends Model {}
Participant.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING,
  },
  dietaryRequirements: {
    type: Sequelize.STRING,
  },
  group: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}, { sequelize, modelName: 'Participant' });

class Group extends Model {}
Group.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  costCode: {
    type: Sequelize.STRING,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}, { sequelize, modelName: 'Group' });

Participant.belongsTo(Group);
Group.hasMany(Participant);

module.exports = { Participant, Group };
