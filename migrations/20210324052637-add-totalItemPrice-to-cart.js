'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Carts',
      'totalItemPrice',
      {
        type: Sequelize.FLOAT
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Carts', 'totalItemPrice')
  }
};