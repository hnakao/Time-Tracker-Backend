'use strict';
module.exports = (sequelize, DataTypes) => {
  const Archive = sequelize.define('archives', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
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

  Archive.associate = function (models) {
    // associations can be defined here
    Archive.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Archive;
};