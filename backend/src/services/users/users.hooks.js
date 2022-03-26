const { authenticate } = require('@feathersjs/authentication').hooks
const { disallow } = require('feathers-hooks-common')
const addAssociations = require('./../../hooks/add-associations')
const createDefaultUserRole = require('./../../hooks/users/create-default-user-role')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'),
      addAssociations({
        models: [
          {
            model: 'user-roles',
            as: 'userRole'
          }
        ]
      })
    ],
    get: [authenticate('jwt'),
      addAssociations({
        models: [
          {
            model: 'user-roles',
            as: 'userRole'
          }
        ]
      })],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [disallow()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [createDefaultUserRole()],
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
