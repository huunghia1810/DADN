// Initializes the `user-change-password` service on path `/user-change-password`
const { UserChangePassword } = require('./user-change-password.class');
const createModel = require('../../models/user-change-password.model');
const hooks = require('./user-change-password.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-change-password', new UserChangePassword(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-change-password');

  service.hooks(hooks);
};
