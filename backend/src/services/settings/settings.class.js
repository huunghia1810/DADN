const _ = require('lodash')
const { Service } = require('feathers-sequelize')

exports.Settings = class Settings extends Service {

  setup(app) {
    this.app = app
  }

  async create(data, params) { //overwrite method post

    if(!_.isUndefined(data.id)) { //exist data -> update
      return await this.app.service('settings').patch(data.id, _.omit(data, ['id']))
    } else {
      return super.create(data, params)
    }
  }
}
