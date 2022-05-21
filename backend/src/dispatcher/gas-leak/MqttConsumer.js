/* eslint-disable camelcase, no-underscore-dangle, class-methods-use-this */
const MqttAdapter = require('./MqttAdapter')

class MqttConsumer extends MqttAdapter {
  constructor(app) {
    const adaFruitConf = app.get('adafruit')
    const { connectUrl, arrTopics, clientId, username, password } = adaFruitConf
    super({ connectUrl, arrTopics, clientId, username, password })
  }

  async subscribe(callback) {
    this._connection.on('message', function(topic, payload, packet) {
      //console.log(`Received from topic '${topic}' with data: ${payload.toString()}`)
      callback(topic, payload)
    })
  }
}

module.exports = MqttConsumer
