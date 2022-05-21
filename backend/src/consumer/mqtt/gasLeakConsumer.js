const _ = require('lodash')
const moment = require('moment')
const { MqttConsumer } = require('../../dispatcher/gas-leak')

class cGasLeakConsumer {
  constructor(app) {
    this.app = app
    this.init()
  }

  init() {
    this.arrTopics = {
      GAS_LEAK : 'gasleak',
      GAS_DATA : 'gasdata',
    }
  }

  async handleSubscribe(topic, payload) {
    try {
      this._log(`Received from topic '${topic}' with data: ${payload.toString()}`, 'handleSubscribe')
      const isBuffer = Buffer.isBuffer(payload)
      let strData = payload

      if (isBuffer) {
        strData = payload.toString('utf8')
      }

      //save data
      await this._handleSaveDataGas(topic, strData)
    } catch (e) {
      this._log(`Error: ${e.message}`, 'handleSubscribe')
    }
  }

  //----------------------private functions-----------------------
  //----------------------private functions-----------------------
  async _handleSaveDataGas(topic, strData) {
    if(topic === this.arrTopics.GAS_LEAK) {
      const objData = {
        index: strData,
      }
      const arrRes = await this.app.service('gas-leak').create(objData)
      return arrRes
    } else if(topic === this.arrTopics.GAS_DATA) {
      //check data exist
      const dataGasData = await this.app.service('gas-data').find({query: {
          id: {$gt: 0}
        }})
      const objData = {
        status: strData == 1 ? 'active': 'inactive',
      }
      if(dataGasData.data.length) { //exist -> update
        const arrRes = await this.app.service('gas-data').patch(dataGasData.data[0], objData)
        return arrRes
      } else { //not exist -> create
        const arrRes = await this.app.service('gas-data').create(objData)
        return arrRes
      }
    }
  }

  _log(message, suffix = '') {
    console.log(`[gasLeakConsumer] ${suffix} ${message}`)
  }
}

const gasLeakConsumer = async (app) => {
  const insGasLeakConsumer = new cGasLeakConsumer(app)
  const insMqttConsumer = new MqttConsumer(app)
  await insMqttConsumer.startConsumer()
  await insMqttConsumer.subscribe(insGasLeakConsumer.handleSubscribe.bind(insGasLeakConsumer))
}

module.exports = gasLeakConsumer
