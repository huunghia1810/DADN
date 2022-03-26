/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')
const moment = require('moment')
const checkPermissions = require('feathers-permissions');

const { Forbidden } = require('@feathersjs/errors')

module.exports = function checkUserPermission(options = {roles: []}) {
  return async (context) => {
    const { app, data } = context

    const res = await checkPermissions({
      roles: async context => {
        const { user } = context.params;
        const roles = await app.service('user').find({
          query: {
            id: user.id
          }
        });

        return roles.data;
      }
    })

    return context
  }
}
