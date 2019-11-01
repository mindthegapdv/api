module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Orders', 'location', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('Orders', 'serviceProvider', {
      type: Sequelize.INTEGER,
    }),
    queryInterface.addColumn('Orders', 'buffer', {
      type: Sequelize.INTEGER,
    }),
  ]), /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
