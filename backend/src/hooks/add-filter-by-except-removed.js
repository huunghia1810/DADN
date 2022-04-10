/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')
const moment = require('moment')
const checkPermissions = require('feathers-permissions');

const { Forbidden } = require('@feathersjs/errors')

module.exports = function addFilterByExceptItemRemoved(options = {roles: []}) {
  return async (context) => {
    try {
      const { app, data, params } = context

      const ignoreServicesFilterDeleted = ['user-change-password']
      if(!ignoreServicesFilterDeleted.includes(context.path)) {
        params.query.isDeleted = { $nin: ['1'] }
      }

    } catch (e) {}

    return context
  }
}
