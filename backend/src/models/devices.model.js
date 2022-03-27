// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const devices = sequelizeClient.define('devices', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,255],
      }
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^\w+$/,
        len: [1,255],
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
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
  devices.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    devices.hasOne(models.users, { //devices.createdBy = users.id
      as: 'user',
      sourceKey: 'createdBy',
      foreignKey: 'id',
    });
  };

  return devices;
};
