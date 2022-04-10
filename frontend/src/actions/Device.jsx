import _ from 'lodash'

import * as constantDevice from '../constants/Device'

import feathersClient from './../feathersClient'

class ActionDevice {
  getDevices() {
    return function (dispatch) {
      dispatch({type: constantDevice.DEVICE_GET_DATA_PROCESSING})
      const query = {
        query: {
          $sort: {id: 1},
          $limit: 1000
        }
      }

      feathersClient.service('devices').find(query)
        .then(response => {
          dispatch({type: constantDevice.DEVICE_GET_DATA_SUCCESS, payload: response})
        }).catch(error => {
        dispatch({type: constantDevice.DEVICE_GET_DATA_FAIL, payload: error.message})
      })
    }
  }
  modifyDevice(data, callbackSuccess = false, callbackError = false) { //create, if exist -> update
    return function (dispatch) {
      dispatch({type: constantDevice.DEVICE_ADD_DATA_PROCESSING})
      feathersClient.service('devices').create(data).then(response => {
        if(typeof callbackSuccess == 'function') {
          callbackSuccess(response)
        }
        dispatch({type: constantDevice.DEVICE_ADD_DATA_SUCCESS, payload: response})
      }).catch(error => {
        if(typeof callbackError == 'function') {
          callbackError(error)
        }
        dispatch({type: constantDevice.DEVICE_ADD_DATA_FAIL, payload: error.message})
      })
    }
  }
}

export default new ActionDevice()