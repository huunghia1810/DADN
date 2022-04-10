// Application hooks that run for every service
const addFilterByExceptItemRemoved = require('./hooks/add-filter-by-except-removed')

module.exports = {
  before: {
    all: [],
    find: [addFilterByExceptItemRemoved()],
    get: [addFilterByExceptItemRemoved()],
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
