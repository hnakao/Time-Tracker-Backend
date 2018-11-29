'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('reports', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    time: {
      type: DataTypes.DOUBLE
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    underscored: false,
    timestamps: false
  });

  Report.associate = function (models) {
    // associations can be defined here
    Report.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'users'
    });

    Report.belongsTo(models.projects, {
      foreignKey: 'projectId',
      as: 'projects'
    });
  };
  return Report;
};