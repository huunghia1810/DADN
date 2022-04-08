const users = require('./users/users.service.js')
const devices = require('./devices/devices.service.js');
const userRoles = require('./user-roles/user-roles.service.js');
const notifications = require('./notifications/notifications.service.js');
const settings = require('./settings/settings.service.js');
const userChangePassword = require('./user-change-password/user-change-password.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(devices);
  app.configure(userRoles);
  app.configure(notifications);
  app.configure(settings);
  app.configure(userChangePassword);
}
