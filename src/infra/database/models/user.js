const { encryptPassword } = require('../../encryption')

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.password = encryptPassword(user.password)
      }
    },
    freezeTableName: true,
    timestamps: false
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.reports, {
      as: 'reports'
    });

    User.belongsToMany(models.projects, {
      through: 'userProject',
      foreignKey: 'userId',
      as: 'projects'
    });

    User.belongsTo(models.roles, { as: 'userRole', foreignKey: 'roleId' });
  };

  return User;
}
