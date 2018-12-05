'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      roleName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      workMode: {
        type: Sequelize.STRING
      },
      basicSalary: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      extraHours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      payExtraHours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles');
  }
};
