import _ from 'lodash'

import * as constantGasLeak from '../constants/GasLeak'

import feathersClient from './../feathersClient'

class ActionGasLeak {
  getGasLeaks(limit = 10) {
    return function (dispatch) {
      dispatch({type: constantGasLeak.GASLEAK_GET_DATA_PROCESSING})
      const query = {
        query: {
          $sort: {id: -1},
          $limit: limit
        }
      }

      feathersClient.service('gas-leak').find(query)
        .then(response => {
          dispatch({type: constantGasLeak.GASLEAK_GET_DATA_SUCCESS, payload: response})
        }).catch(error => {
        dispatch({type: constantGasLeak.GASLEAK_GET_DATA_FAIL, payload: error.message})
      })
    }
  }
}

export default new ActionGasLeak()