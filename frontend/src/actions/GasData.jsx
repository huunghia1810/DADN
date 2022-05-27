import _ from 'lodash'

import * as constantGasData from '../constants/GasData'

import feathersClient from './../feathersClient'

class ActionGasData {
  getGasData(limit = 5) {
    return function (dispatch) {
      dispatch({type: constantGasData.GASDATA_GET_DATA_PROCESSING})
      const query = {
        query: {
          $sort: {id: -1},
          $limit: limit
        }
      }

      feathersClient.service('gas-data').find(query)
        .then(response => {
          dispatch({type: constantGasData.GASDATA_GET_DATA_SUCCESS, payload: response})
        }).catch(error => {
        dispatch({type: constantGasData.GASDATA_GET_DATA_FAIL, payload: error.message})
      })
    }
  }
}

export default new ActionGasData()