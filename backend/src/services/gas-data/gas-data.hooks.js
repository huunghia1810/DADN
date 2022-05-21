const { authenticate } = require('@feathersjs/authentication').hooks
const { disallow } = require('feathers-hooks-common')

const attachUserInfo = require('./../../hooks/attach-user-info')
const addAssociations = require('./../../hooks/add-associations')
const attachCreatedBy = require('./../../hooks/attach-created-by')
const addFilterByCurrentUser = require('./../../hooks/add-filter-by-current-user')

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      attachUserInfo()
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
    remove: [disallow()]
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
