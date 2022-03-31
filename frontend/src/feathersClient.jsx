// src/feathers.js
import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import authentication from '@feathersjs/authentication'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import localStorage from 'localstorage-memory'
import auth from '@feathersjs/authentication-client'
// Socket.io is exposed as the `io` global.
//const socket = io('http://localhost:3445')
const baseUrl = process.env.REACT_APP_API_BASE_URL

//const restClient = rest(baseUrl)

const socket = io(baseUrl)
// @feathersjs/client is exposed as the `feathers` global.
const feathersClient = feathers()
  .configure(feathers.socketio(socket))
  //.configure(restClient.axios(axios))
  // Register hooks module
  //.configure(hooks())
  //incase we later have to do authentication
  .configure(auth(
    {
      // stores the jwt in the browser's local storage
      storage: window.localStorage,
      // storage key for the jwt
      storageKey: 'feathers-jwt'
    }
  ))

// feathersClient.service('notifications').create({
//   content: "This notification content 1",
//   type: "notify"
// })

export default feathersClient