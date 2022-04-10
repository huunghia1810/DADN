// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const settings = sequelizeClient.define('settings', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fanMode: {
      type: DataTypes.ENUM(1, 0),
      allowNull: false,
      defaultValue: 1,
    },
    fanSpeed: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      validate: {
        min: 0,
        max: 100,
      }
    },
    buzzLoudness: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      validate: {
        min: 0,
        max: 100,
      }
    },
    sendSMS: {
      type: DataTypes.ENUM(1, 0),
      allowNull: false,
      defaultValue: 1,
    },
    ledBuzz: {
      type: DataTypes.ENUM(1, 0),
      allowNull: false,
      defaultValue: 1,
    },
    isDeleted: {
      type: DataTypes.ENUM(1, 0),
      allowNull: false,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: 'createdBy'
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  settings.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    settings.hasOne(models.users, { //devices.createdBy = users.id
      as: 'user',
      sourceKey: 'createdBy',
      foreignKey: 'id',
    })
  };

  return settings;
};
