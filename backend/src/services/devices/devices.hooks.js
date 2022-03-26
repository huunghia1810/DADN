const { authenticate } = require('@feathersjs/authentication').hooks
const checkPermissions = require('feathers-permissions')

const checkUserPermission = require('../../hooks/users/check-user-permission')

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      //checkUserPermission({ roles: [ 'admin', 'user' ] }),
      checkPermissions({
        roles: async context => {
          const { params: { user }, app } = context
          const roles = await app.service('users').find({
            query: {
              id: user.id
            }
          })

          return roles.data
        }
      }),
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
