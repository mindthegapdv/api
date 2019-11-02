/* eslint-disable max-classes-per-file */
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('./index');
const { Participant } = require('./groups');

class Order extends Model {}
Order.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  dt_scheduled: {
    type: Sequelize.DATE,
  },
  location: {
    type: Sequelize.STRING,
  },
  serviceProvider: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING,
  },
  menuDescription: {
    type: Sequelize.STRING,
  },
  buffer: {
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
}, { sequelize, modelName: 'Order' });

const validStatus = ['Open To Join', 'Order Placed', 'Preparing', 'Ready To Eat', 'Feedback', 'Closed'];

class OrderParticipant extends Model {}
OrderParticipant.init({
  status: Sequelize.INTEGER,
  feedback: Sequelize.INTEGER,
}, { sequelize, timestamps: false, modelName: 'OrderParticipants' });

Participant.belongsToMany(Order, { through: OrderParticipant, foreignKey: 'participantId' });
Order.belongsToMany(Participant, { through: OrderParticipant, foreignKey: 'orderId' });

module.exports = { validStatus, Order, OrderParticipant };
