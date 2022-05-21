// Initializes the `gas-data` service on path `/gas-data`
const { GasData } = require('./gas-data.class');
const createModel = require('../../models/gas-data.model');
const hooks = require('./gas-data.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gas-data', new GasData(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gas-data');

  service.hooks(hooks);
};
