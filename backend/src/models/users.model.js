// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        //is: ['[a-z]','i'],        // will only allow letters
        //max: 12,                  // only allow values <= 23
        len: [9,12]
        // isIn: {
        //   args: [['en', 'zh']],
        //   msg: "Must be English or Chinese"
        // }
      }
    },
    lastLoggedIn: {
      type: DataTypes.DATE
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  });


  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    users.hasOne(models.user_roles, {
      as: 'userRole',
      foreignKey: 'userId'
    });
  }

  return users
}
