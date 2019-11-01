const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('./index');

class ServiceProvider extends Model {}
ServiceProvider.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  contactEmail: {
    type: Sequelize.STRING,
  },
  noticePeriod: {
    type: Sequelize.INTEGER,
  },
  costPerPerson: {
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
}, { sequelize, modelName: 'ServiceProvider' });

module.exports = ServiceProvider;
