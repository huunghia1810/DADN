const configureGasLeakConsumer = require('./gasLeakConsumer')

module.exports = async function(app) {
  app.use(await configureGasLeakConsumer(app))
}
