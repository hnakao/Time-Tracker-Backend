'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      time: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      extra: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      internet: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      totalCUC: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      month: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('invoices');
  }
};
