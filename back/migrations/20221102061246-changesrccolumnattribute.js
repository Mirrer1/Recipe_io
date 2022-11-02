'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('images', 'src', {
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface, Sequelize) {

  }
};
