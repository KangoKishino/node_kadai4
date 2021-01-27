'use strict';

const db = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'Hello',
          text: 'World',
          userId: 1,
          userName: 'a',
          like: 1,
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
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
