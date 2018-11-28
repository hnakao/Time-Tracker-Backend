'use strict';
module.exports = (sequelize, DataTypes) => {
  const userProject = sequelize.define('userProject', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    underscored: false,
    timestamps: false
  });
  userProject.associate = function(models) {
    // associations can be defined here
  };
  return userProject;
};
