'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('posts', 'title', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('posts', 'desc', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('posts', 'ingredient', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('posts', 'recipes', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('posts', 'tips', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('posts', 'tags', {
        type: Sequelize.STRING,
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('posts', 'title'),
      queryInterface.removeColumn('posts', 'desc'),
      queryInterface.removeColumn('posts', 'ingredient'),
      queryInterface.removeColumn('posts', 'recipes'),
      queryInterface.removeColumn('posts', 'tips'),
      queryInterface.removeColumn('posts', 'tags'),
    ];
  },
};
