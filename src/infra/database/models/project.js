'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('projects', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    estimatedDuration: {
      type: DataTypes.INTEGER
    },
    currentSpentTime: {
      type: DataTypes.INTEGER
    },
  });

  Project.associate = function (models) {
    //associations can be defined here
    Project.hasMany(models.reports);

    Project.belongsToMany(models.users, {
      through: 'userProject',
      foreignKey: 'projectId',
      as: 'users'
    });
  };
  return Project;
};
