// Initializes the `gas-leak` service on path `/gas-leak`
const { GasLeak } = require('./gas-leak.class');
const createModel = require('../../models/gas-leak.model');
const hooks = require('./gas-leak.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gas-leak', new GasLeak(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gas-leak');

  service.hooks(hooks);
};
