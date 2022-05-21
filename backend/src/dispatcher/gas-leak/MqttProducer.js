/* eslint-disable camelcase, no-underscore-dangle, class-methods-use-this */
const config = require('config')
const MqttAdapter = require('./MqttAdapter')

class MqttProducer extends MqttAdapter {
  constructor(app) {
    const adaFruitConf = app.get('adafruit')
    const { connectUrl, arrTopics, clientId, username, password } = adaFruitConf
    super({ connectUrl, arrTopics, clientId, username, password })

    this.app = app
    this.adaFruitConf = adaFruitConf
  }

  sendMessage(topic, dataItem) {
    const { arrTopics } = this.adaFruitConf

    this._connection.publish(arrTopics[topic], String(dataItem), function() {
      console.log(`Pushed data '${dataItem}' to topic '${topic}'`)
    })
  }
}

module.exports = MqttProducer
