'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('reports', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE
    }
  },
  {
    underscored: false
  });

  Report.associate = function (models) {
    // associations can be defined here
    Report.hasMany(models.tasks);

    Report.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Report;
};
