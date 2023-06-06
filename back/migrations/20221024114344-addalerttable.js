'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alerts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      CommentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'comments',
          key: 'id',
        },
      },
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      AlerterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      AlertedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alerts');
  },
};
