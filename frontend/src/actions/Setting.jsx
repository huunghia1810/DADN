import _ from 'lodash'

import * as constantSetting from '../constants/Setting'

import feathersClient from './../feathersClient'

class ActionNotification {
    getSettings() {
        return function (dispatch) {
            dispatch({type: constantSetting.SETTING_GET_DATA_PROCESSING})
            const query = {
                query: {
                    $sort: {id: -1}
                }
            }

            feathersClient.service('settings').find(query)
              .then(response => {
                  dispatch({type: constantSetting.SETTING_GET_DATA_SUCCESS, payload: response})
            }).catch(error => {
                dispatch({type: constantSetting.SETTING_GET_DATA_FAIL, payload: error.message})
            })
        }
    }
}

export default new ActionNotification()