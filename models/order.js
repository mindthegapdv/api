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

class OrderParticipants extends Model {}
OrderParticipants.init({
  status: Sequelize.INTEGER,
}, { sequelize, timestamps: false, modelName: 'OrderParticipants' });

Participant.belongsToMany(Order, { through: OrderParticipants, foreignKey: 'participantId' });
Order.belongsToMany(Participant, { through: OrderParticipants, foreignKey: 'orderId' });

module.exports = Order;
