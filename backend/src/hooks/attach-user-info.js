/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')
const moment = require('moment')
const checkPermissions = require('feathers-permissions');

const { Forbidden } = require('@feathersjs/errors')

module.exports = function attachUserInfo(options = {roles: []}) {
  return async (context) => {
    try {
      const { app, data, params: { user } } = context
      const userData = await app.service('users').get(user.id)
      user.permissions = JSON.parse(userData.userRole.dataValues.roles)
    } catch (e) {}

    return context
  }
}
