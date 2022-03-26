/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')
const moment = require('moment')
const checkPermissions = require('feathers-permissions');

const { Forbidden } = require('@feathersjs/errors')

module.exports = function createDefaultUserRole(options = {roles: []}) {
  return async (context) => {
    const { app, data, params, result } = context

    const objUserRolesInfo = {
      userId: result.id,
      roles: JSON.stringify(['normal'])
    }
    const dataUserRole = await app.service('user-roles').create(objUserRolesInfo);

    result.userRole = dataUserRole
    return context
  }
}
