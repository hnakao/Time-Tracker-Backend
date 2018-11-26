'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    rolName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    workMode: {
      type: DataTypes.STRING
    },
    basicSalary: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    extraHours: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    payExtraHours: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    underscored: false
  });

  Role.associate = function (models) {
    // associations can be defined here
    Role.hasMany(models.users, {foreignKey : 'roleId'});
  };
  return Role;
};
