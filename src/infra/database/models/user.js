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
    mobile: {
      type: DataTypes.STRING
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Developer',
      allowNull: false
    },
    salary: {
      type: DataTypes.DOUBLE
    },
    internet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.password = encryptPassword(user.password)
      }
    },
    freezeTableName: true,
    underscored: false
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.reports);

    User.hasMany(models.invoices);

    User.belongsToMany(models.projects, {
      through: 'userProject',
      foreignKey: 'userId',
      as: 'projects'
    });
  };

  return User;
}
