const _ = require('lodash')
const moment = require('moment')
const { MqttAdapter } = require('../../dispatcher/gas-leak')

class cGasLeakConsumer {
  constructor(app) {
    this.app = app
    this.init()
  }

  init() {
    const adafruitConf = this.app.get('adafruit')
    const { arrTopics } = adafruitConf
    this.arrTopics = arrTopics
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
    if(topic === this.arrTopics.gasleak) {
      const objData = {
        index: strData,
        createdBy: 1
      }, objDataNotify = {
        content: `[Gas Leak] has new data: '${strData}'`,
        type: 'notify',
        createdBy: 1
      }
      const arrRes = await this.app.service('gas-leak').create(objData)

      //create notification
      await this.app.service('notifications').create(objDataNotify)

      return arrRes
    } else if(topic === this.arrTopics.gasdata) {
      const objData = {
        status: strData == 1 ? 'active': 'inactive',
      }
      const arrRes = await this.app.service('gas-data').create(objData)
      return arrRes

      //check data exist
      /*const dataGasData = await this.app.service('gas-data').find({query: {
          id: {$gt: 0}
        }})
      if(dataGasData.data.length) { //exist -> update
        const arrRes = await this.app.service('gas-data').patch(dataGasData.data[0].id, objData)
        return arrRes
      } else { //not exist -> create
        const arrRes = await this.app.service('gas-data').create(objData)
        return arrRes
      }*/
    }
  }

  _log(message, suffix = '') {
    console.log(`[gasLeakConsumer] ${suffix} ${message}`)
  }
}

const gasLeakConsumer = async (app) => {
  const insGasLeakConsumer = new cGasLeakConsumer(app)
  const insMqttAdapter = new MqttAdapter(app, insGasLeakConsumer.handleSubscribe.bind(insGasLeakConsumer))
  app.mqtt = insMqttAdapter

  //await insMqttAdapter.startConsumer()
  //await insMqttAdapter.subscribe(insGasLeakConsumer.handleSubscribe.bind(insGasLeakConsumer))
}

module.exports = gasLeakConsumer
