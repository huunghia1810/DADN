const MqttConsumer = require('./mqtt')

module.exports = function configure(app) {
  app.configure(MqttConsumer)
}
