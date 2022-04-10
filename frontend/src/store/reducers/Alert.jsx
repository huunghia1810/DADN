import * as constantAlert from '../../constants/Alert'

const initialState = {
  fetching: false,

  listAlerts:[],
  total: 0,
  limit: 0,
  skip: 0,

  listAlertsUnread:[],
  totalUnread: 0,
  limitUnread: 0,
  skipUnread: 0,

  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constantAlert.ALERT_GET_LIST_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        listAlerts: [],
        total: 0,
        limit: 0,
        skip: 0,

        listAlertsUnread:[],
        totalUnread: 0,
        limitUnread: 0,
        skipUnread: 0,

        error: null,
      }
    case constantAlert.ALERT_GET_LIST_DATA_SUCCESS:
    case constantAlert.ALERT_GET_LIST_DATA_UNREAD_SUCCESS:
      const { total, limit, skip, data, type } = action.payload
      if(type === constantAlert.ALERT_GET_TYPE_UNREAD) {
        return {
          ...state,
          fetching: false,
          listAlertsUnread: data,
          totalUnread: total,
          limitUnread: limit,
          skipUnread: skip,
          error: null,
        }
      } else {
        return {
          ...state,
          fetching: false,
          listAlerts: data,
          total,
          limit,
          skip,
          error: null,
        }
      }
    case constantAlert.ALERT_GET_LIST_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listAlerts: [],
        total: 0,
        limit: 0,
        skip: 0,

        listAlertsUnread:[],
        totalUnread: 0,
        limitUnread: 0,
        skipUnread: 0,

        error: action.payload,
      }

    case constantAlert.ALERT_UPDATE_NOTIFY_PROCESSING:
      return {
        ...state,
        fetching: true,
        error: null,
      }
    case constantAlert.ALERT_UPDATE_NOTIFY_SUCCESS:
      //nothing
      return {
        ...state,
      }
    case constantAlert.ALERT_UPDATE_NOTIFY_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
    default:
      return state
  }
}