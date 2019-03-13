'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('tasks', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    time: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    underscored: false
  });

  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.reports, {
      foreignKey: 'reportId',
      as: 'report'
    });

    Task.belongsTo(models.projects, {
      foreignKey: 'projectId',
      as: 'project'
    });
  };
  return Task;
};
