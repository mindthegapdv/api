const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('./index');

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
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}, { sequelize, modelName: 'Order' });

module.exports = Order;
