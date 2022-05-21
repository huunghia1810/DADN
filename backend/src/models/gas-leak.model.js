// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const gasLeak = sequelizeClient.define('gas_leak', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    index: {
      type: DataTypes.FLOAT,
      decimals: 2,
      defaultValue: 10.00,
      validate: {
        min: 0,
        max: 10.00,
      }
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
        options.raw = true
      }
    }
  })

  // eslint-disable-next-line no-unused-vars
  gasLeak.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    gasLeak.hasOne(models.users, { //devices.createdBy = users.id
      as: 'user',
      sourceKey: 'createdBy',
      foreignKey: 'id',
    })
  }

  return gasLeak
}
