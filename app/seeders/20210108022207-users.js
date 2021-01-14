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
          password: '$2b$10$gln9Ekasc8OxtgR3DC6lJee9ovyH7V1pt9xFDzxCQFdLFeX4paSii',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
            name: 'b',
            email: 'b@b.com',
            password: '$2b$10$NN7gbrxGXmkesJ5iIqEld.aqpdbf7pWxqE1NA3lzbs23BKWLvzRNa',
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