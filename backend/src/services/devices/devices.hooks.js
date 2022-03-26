const { authenticate } = require('@feathersjs/authentication').hooks
const checkPermissions = require('feathers-permissions')
const attachUserInfo = require('./../../hooks/attach-user-info');

//const checkUserPermission = require('../../hooks/users/check-user-permission')

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      attachUserInfo(),
      checkPermissions({
        roles: [ 'admin' ],
      }),
      // checkPermissions({
      //   roles: [ 'admin' ],
      //   field: async context => {
      //     const { params: { user }, app } = context
      //     const userData = await app.service('users').get(user.id)
      //     let arrRoles = []
      //     try {
      //       arrRoles = JSON.parse(userData.userRole.dataValues.roles)
      //     } catch (e) {}
      //     return arrRoles;
      //   }
      // }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
