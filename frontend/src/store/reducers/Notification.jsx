import * as constantNotification from '../../constants/Notification'

const initialState = {
  fetching: false,

  listNotifications:[],
  total: 0,
  limit: 0,
  skip: 0,

  listNotificationsUnread:[],
  totalUnread: 0,
  limitUnread: 0,
  skipUnread: 0,

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

        listNotificationsUnread:[],
        totalUnread: 0,
        limitUnread: 0,
        skipUnread: 0,

        error: null,
      }
    case constantNotification.NOTIFICATION_GET_LIST_DATA_SUCCESS:
    case constantNotification.NOTIFICATION_GET_LIST_DATA_UNREAD_SUCCESS:
      const { total, limit, skip, data, type } = action.payload
      if(type === constantNotification.NOTIFICATION_GET_TYPE_UNREAD) {
        return {
          ...state,
          fetching: false,
          listNotificationsUnread: data,
          totalUnread: total,
          limitUnread: limit,
          skipUnread: skip,
          error: null,
        }
      } else {
        return {
          ...state,
          fetching: false,
          listNotifications: data,
          total,
          limit,
          skip,
          error: null,
        }
      }
    case constantNotification.NOTIFICATION_GET_LIST_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listNotifications: [],
        total: 0,
        limit: 0,
        skip: 0,

        listNotificationsUnread:[],
        totalUnread: 0,
        limitUnread: 0,
        skipUnread: 0,

        error: action.payload,
      }

    case constantNotification.NOTIFICATION_UPDATE_NOTIFY_PROCESSING:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case constantNotification.NOTIFICATION_UPDATE_NOTIFY_SUCCESS:
      //nothing
      return {
        ...state,
      }
    case constantNotification.NOTIFICATION_UPDATE_NOTIFY_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
    default:
      return state
  }
}