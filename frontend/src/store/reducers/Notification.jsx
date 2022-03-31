import * as constantNotification from '../../constants/Notification'

const initialState = {
    fetching: false,
    listNotifications:[],
    total: 0,
    limit: 0,
    skip: 0,
    error: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constantNotification.NOTIFICATION_GET_LIST_DATA_PROCESSING:
            return {
                ...state,
                fetching: true,
                listNotifications: [],
                total: 0,
                limit: 0,
                skip: 0,
                error: null,
            }
        case constantNotification.NOTIFICATION_GET_LIST_DATA_SUCCESS:
            const { total, limit, skip, data } = action.payload
            return {
                ...state,
                fetching: false,
                listNotifications: data,
                total,
                limit,
                skip,
                error: null,
            }
        case constantNotification.NOTIFICATION_GET_LIST_DATA_FAIL:
            return {
                ...state,
                fetching: false,
                listNotifications: [],
                total: 0,
                limit: 0,
                skip: 0,
                error: action.payload,
            }
        default:
            return state
    }
}