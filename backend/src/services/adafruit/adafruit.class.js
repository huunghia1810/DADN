const _ = require('lodash')
const { Service } = require('feathers-sequelize')

const ACTIONS = {
  PRODUCER: 'producer',
  CONSUMER: 'consumer',
}
const TOPICS = {
  GAS_LEAK : 'gasleak',
  GAS_DATA : 'gasdata',
}

exports.Adafruit = class Adafruit extends Service {

  setup(app) {
    this.app = app
  }

  async create(data, params) { //overwrite method post
    let { action, topic } = params.query
    action = action || ACTIONS.PRODUCER
    topic = topic || TOPICS.GAS_LEAK

    switch (action) {
      case ACTIONS.PRODUCER:
        const insMqtt = this.app.mqtt
        data.map(dataItem => {
          insMqtt.sendMessage(topic, parseFloat(dataItem), params.user)
        })
        break
      default: //nothing
        break
    }
  }

}
