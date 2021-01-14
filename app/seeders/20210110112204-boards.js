'use strict';

const db = require('../models/');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Boards',
      [
        {
          title: 'Hello',
          text: 'World',
          userId: 1,
          userName: 'a',
          like: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Title',
          text: 'Text',
          userId: 2,
          userName: 'b',
          like: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Boards', null, {});
  },
};
