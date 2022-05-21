// Initializes the `adafruit` service on path `/adafruit`
const { Adafruit } = require('./adafruit.class');
const createModel = require('../../models/adafruit.model');
const hooks = require('./adafruit.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/adafruit', new Adafruit(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('adafruit');

  service.hooks(hooks);
};
