import * as constantNotification from '../constants/Notification'

import feathersClient from './../feathersClient'

class ActionNotification {
    getListNotifications() {
        return function (dispatch) {
            dispatch({type: constantNotification.NOTIFICATION_GET_LIST_DATA_PROCESSING})
            feathersClient.service('notifications').find({
                query: {
                    isDeleted: { $ne: 1 },
                    $sort: { id: -1 },
                    $limit: 5, //default limit 5 items
                }
            }).then(response => {
                dispatch({type: constantNotification.NOTIFICATION_GET_LIST_DATA_SUCCESS, payload: response})
            }).catch(error => {
                dispatch({type: constantNotification.NOTIFICATION_GET_LIST_DATA_FAIL, payload: error.message})
            })
        }
    }
}

export default new ActionNotification()