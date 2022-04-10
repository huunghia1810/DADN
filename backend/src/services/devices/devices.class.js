const _ = require('lodash')
const { Service } = require('feathers-sequelize')
const errors = require('@feathersjs/errors')

exports.Devices = class Devices extends Service {

  setup(app) {
    this.app = app
  }

  async create(data, params) { //overwrite method post
    let dataUpdate = [],
      dataCreate = [],
      resCreate = [],
      resUpdate = []
    try {
      data.map(item => {
        if(typeof item.id == 'number') {
          dataUpdate.push(item)
        } else {
          dataCreate.push(item)
        }
      })
      if(dataCreate.length) {
        resCreate = await super.create(dataCreate, params)
      }
      if(dataUpdate.length) {
        resUpdate = await super.patch(null, dataUpdate, params)
      }
    } catch (e) {
      throw e
      //throw new errors.BadRequest(`${e.message}`)
    }
    return resCreate
    //return [...resCreate, ...resUpdate]
  }

}
