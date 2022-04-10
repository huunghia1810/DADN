import _ from 'lodash'

import * as constantAlert from '../constants/Alert'

import feathersClient from './../feathersClient'

class ActionNotification {
    getListNotifications(type = constantAlert.ALERT_GET_TYPE_ALL) { //type: all, unread
        return function (dispatch) {
            dispatch({type: constantAlert.ALERT_GET_LIST_DATA_PROCESSING})
            const query = {
                isDeleted: { $ne: 1 },
                type: 'notify',
                $sort: { id: -1 },
                $limit: 5, //default limit 5 items
            }
            if(type === constantAlert.ALERT_GET_TYPE_UNREAD) {
                query.status = constantAlert.ALERT_GET_TYPE_UNREAD
            }

            feathersClient.service('notifications').find({query})
              .then(response => {
                if(type === constantAlert.ALERT_GET_TYPE_UNREAD) {
                    dispatch({type: constantAlert.ALERT_GET_LIST_DATA_UNREAD_SUCCESS, payload: {...response, type}})
                } else {
                    dispatch({type: constantAlert.ALERT_GET_LIST_DATA_SUCCESS, payload: response})
                }
            }).catch(error => {
                dispatch({type: constantAlert.ALERT_GET_LIST_DATA_FAIL, payload: error.message})
            })
        }
    }
    updateNotify({id, data}) {
        return function (dispatch) {
            dispatch({type: constantAlert.ALERT_UPDATE_NOTIFY_PROCESSING})
            feathersClient.service('notifications').patch(id, _.omit(data, ['id'])).then(response => {
                dispatch({type: constantAlert.ALERT_UPDATE_NOTIFY_SUCCESS, payload: response})
            }).catch(error => {
                dispatch({type: constantAlert.ALERT_UPDATE_NOTIFY_FAIL, payload: error.message})
            })
        }
    }
}

export default new ActionNotification()