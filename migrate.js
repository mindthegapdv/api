const Umzug = require('umzug');
const path = require('path');
const { sequelize } = require('./models/index');

const migrationPath = path.resolve('./migrations');
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
  migrations: {
    path: migrationPath,
    params: [sequelize.getQueryInterface(), sequelize.constructor],
  },
});

umzug.up().then(() => {
  sequelize.close();
});
