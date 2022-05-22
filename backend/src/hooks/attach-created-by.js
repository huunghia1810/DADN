/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')
const moment = require('moment')
const checkPermissions = require('feathers-permissions');

const { Forbidden } = require('@feathersjs/errors')

module.exports = function attachCreatedBy(options = {roles: []}) {
  return async (context) => {
    try {
      const { app, data, params: { user } } = context

      if(user) {
        if(Array.isArray(data)) {
          data.map(item => {
            item.createdBy = user.id
          })
        } else if(typeof data == 'object') {
          data.createdBy = user.id
        }
      }
    } catch (e) {}

    return context
  }
}
