const users = require('./users/users.service.js')
const devices = require('./devices/devices.service.js');
const userRoles = require('./user-roles/user-roles.service.js');
const notifications = require('./notifications/notifications.service.js');
const settings = require('./settings/settings.service.js');
const userChangePassword = require('./user-change-password/user-change-password.service.js');
const gasSensorDataDownload = require('./gas-sensor-data-download/gas-sensor-data-download.service.js');
const gasLeak = require('./gas-leak/gas-leak.service.js');
const gasData = require('./gas-data/gas-data.service.js');
const adafruit = require('./adafruit/adafruit.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(devices);
  app.configure(userRoles);
  app.configure(notifications);
  app.configure(settings);
  app.configure(userChangePassword);
  app.configure(gasSensorDataDownload);
  app.configure(gasLeak);
  app.configure(gasData);
  app.configure(adafruit);
}
