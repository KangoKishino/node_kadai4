'use strict';

const db = require('../models/');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'a',
          email: 'a@a.com',
          password: 'aaaaaaa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
            name: 'b',
            email: 'b@b.com',
            password: 'bbbbbbb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};