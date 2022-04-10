const _ = require('lodash')
const { Service } = require('feathers-sequelize')
const errors = require('@feathersjs/errors')

exports.Devices = class Devices extends Service {

  setup(app) {
    this.app = app
  }

  async create(data, params) { //overwrite method post
    if(Array.isArray(data)) {
      let dataUpdate = [],
        dataCreate = [],
        resCreate = [],
        resUpdate = [],
        res = []
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
          resUpdate = await Promise.all(dataUpdate.map(curDevice => this._updateDevice(curDevice)));
        }
      } catch (e) {
        throw e
        //throw new errors.BadRequest(`${e.message}`)
      }
      //return resCreate
      res = [...resCreate, ...resUpdate]

      //handle remove item not in list id of res
      const arrIdsEffect = res.map(item => item.id)
      const query = {
        id: {$nin: arrIdsEffect},
        createdBy: params.user.id
      }
      await this.app.service('devices').patch(null, {isDeleted: 1}, {query: query})

      return res
    } else if(typeof data == 'object') {
      return super.create(data, params)
    }
  }

  _updateDevice(objDevice) {
    const self = this,
      { id } = objDevice
    return new Promise(async (resolve, reject) => {
      try {
        const res = await self.app.service('devices').patch(id, _.omit(objDevice, ['id']))
        resolve(res)
      } catch (e) {
        reject(e)
      }
    })
  }

}
