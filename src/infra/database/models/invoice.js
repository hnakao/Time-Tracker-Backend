'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('invoices', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    salary: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    time: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    extra: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    internet: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    totalCUC: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    month: {
      type: DataTypes.INTEGER
    },
    year: {
      type: DataTypes.INTEGER
    }
  },
  {
    underscored: false
  });

  Invoice.associate = function (models) {
    // associations can be defined here
    Invoice.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Invoice;
};