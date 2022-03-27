const { authenticate } = require('@feathersjs/authentication').hooks
const checkPermissions = require('feathers-permissions')
const attachUserInfo = require('./../../hooks/attach-user-info')
const addAssociations = require('./../../hooks/add-associations')
const attachCreatedBy = require('./../../hooks/attach-created-by')
const addFilterByCurrentUser = require('./../../hooks/add-filter-by-current-user')

//const checkUserPermission = require('../../hooks/users/check-user-permission')

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      attachUserInfo(),
      // checkPermissions({
      //   roles: [ 'admin' ],
      // }),
      // checkPermissions({
      //   roles: [ 'admin' ],
      //   field: async context => {
      //     const { params: { user }, app } = context
      //     const userData = await app.service('users').get(user.id)
      //     let arrRoles = []
      //     try {
      //       arrRoles = JSON.parse(userData.userRole.dataValues.roles)
      //     } catch (e) {}
      //     return arrRoles
      //   }
      // }),
    ],
    find: [
      addFilterByCurrentUser(),
      addAssociations({
        models: [
          {
            model: 'users',
            as: 'user'
          }
        ]
      })
    ],
    get: [
      addFilterByCurrentUser(),
      addAssociations({
        models: [
          {
            model: 'users',
            as: 'user'
          }
        ]
      })
    ],
    create: [attachCreatedBy()],
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
