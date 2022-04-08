const { Service } = require('feathers-sequelize')
const errors = require('@feathersjs/errors')
const bcrypt = require('bcryptjs')

const comparePasswords = (oldPassword, password) => new Promise((resolve, reject) => {
  bcrypt.compare(oldPassword, password, (err, data1) => {
    if(err || !data1) return reject()
    return resolve()
  })
})

exports.UserChangePassword = class UserChangePassword extends Service {

  setup(app) {
    this.app = app;
  }

  async create(data, params) { //overwrite method post
    const user = params.user
    if(!data.password) throw new errors.BadRequest(`Missing password`)
    if(!data.oldPassword) throw new errors.BadRequest(`Missing oldPassword`)
    try {
      await comparePasswords(data.oldPassword, user.password)
    }
    catch(e) {
      throw new errors.BadRequest('Current password wrong')
    }
    const newUser = await this.app.service('users').patch(user.id, {password: data.password})
    delete newUser.password // never send pwd to client
    return newUser
  }
}
