'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: bcrypt.hashSync('admin12345', 10),
      role: 'admin',
      createdAt: new Date (),
      updatedAt: new Date ()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
