module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('OrderParticipants', 'feedback', {
      type: Sequelize.INTEGER,
    }),
    queryInterface.addColumn('Orders', 'status', {
      type: Sequelize.STRING,
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
