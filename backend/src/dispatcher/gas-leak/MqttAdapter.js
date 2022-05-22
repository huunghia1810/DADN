/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/*docs: https://learn.adafruit.com/adafruit-io/mqtt-api?view=all#mqtt-api*/

const _ = require('lodash')
const mqtt = require('mqtt')

//config
const host = 'broker.emqx.io'
const port = '1883'
//const clientId = `mqtt_${Math.random().toString(8).substr(2, 4)}`
const clientId = `mqtt_1117`
const username = 'nghiahuynhcse'
const password = 'aio_OYJo92RdcuJeZl1tPIRWuWO6zMN6'


let connectUrl = `mqtt://io.adafruit.com`
/*connectUrl = `mqtt://io.adafruit.com/nghiahuynhcse/dashboards/gas`
connectUrl = `https://io.adafruit.com/nghiahuynhcse/`
connectUrl = `mqtt://io.adafruit.com/nghiahuynhcse`*/

const min = 5, max = 10
const conv = num => [
  (num >> 24) & 255,
  (num >> 16) & 255,
  (num >> 8) & 255,
  num & 255,
]


class MqttAdapter {
  constructor (app, callback) {
    const adafruitConf = app.get('adafruit')
    const { connectUrl, arrTopics, clientId, username, password } = adafruitConf

    this.connectUrl = connectUrl
    this.clientId = clientId
    this.username = username
    this.password = password
    this.arrTopics = arrTopics || []
    this.callback = callback

    this._connection = null
    this.app = app

    this.connect()

    /*const client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: username,
      password: password,
      keepalive: 0,
      //reconnectPeriod: 1000,
    })

    let topic = 'nghiahuynhcse/gas/gasleak'
    topic = 'nghiahuynhcse/feeds/gasleak'

    client.subscribe(topic)

    client.on('connect', () => {
      console.log('Connected')
      //setInterval(() => {
        let rand = Math.random() * 100
        const maximum = 10, minimum = 4
        rand = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
        client.publish(topic, String(rand) + '.99', function() {
          console.log("Pushed: " + rand)
          //client.end() // Close the connection when published
        })
      //}, 1000)
    })
    client.on('message', function(topic, payload, packet) {
      console.log(`Received______ '${topic}'`)
    })*/
  }

  connect() {
    if(this._connection) {
      this.disconnect()
      this.connect()
    }
    const self = this
    this._connection = mqtt.connect(this.connectUrl, {
      clientId: this.clientId,
      clean: true,
      connectTimeout: 4000,
      username: this.username,
      password: this.password,
      keepalive: 0,
    })

    let listTopic = Object.keys(this.arrTopics).map(key => {
      return this.arrTopics[key]
    })
    this._connection.subscribe(listTopic)

    this._connection.on('connect', () => {
      console.log('Connected')

      /*let rand = Math.random() * 100
      const maximum = 10, minimum = 4
      rand = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
      this._connection.publish('nghiahuynhcse/feeds/gasleak', String(rand) + '.99', function() {
        console.log("Pushed: " + rand)
      })*/
    })

    //consume
    this._connection.on('message', function(topic, payload, packet) {
      console.log(`Received______ topic | data: '${topic}' | '${topic}'`)
      self.callback(topic, payload)
    })

  }

  disconnect() {
    if(this._connection) {
      this._connection.disconnect()
      this._connection = null
    }
  }

  async sendMessage(topic, dataItem, user) {
    this._connection.publish(this.arrTopics[topic], String(dataItem), function() {
      console.log(`Pushed data '${dataItem}' to topic '${topic}'`)
    })
  }
}

module.exports = MqttAdapter
