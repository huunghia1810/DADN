import * as constantDevice from '../../constants/Device'

const initialState = {
  fetching: false,
  listDevices: [],
  total: 0,
  limit: 0,
  skip: 0,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constantDevice.DEVICE_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        listDevices: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: null,
      }
    case constantDevice.DEVICE_GET_DATA_SUCCESS:
      const { total, limit, skip, data, type } = action.payload
      return {
        ...state,
        fetching: false,
        listDevices: data,
        totalUnread: total,
        limitUnread: limit,
        skipUnread: skip,
        error: null,
      }
    case constantDevice.DEVICE_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listDevices: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: action.payload,
      }

    case constantDevice.DEVICE_ADD_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        listDevices: [],
        error: null,
      }
    case constantDevice.DEVICE_ADD_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        listDevices: action.payload,
        error: null,
      }
    case constantDevice.DEVICE_ADD_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listDevices: [],
        error: action.payload,
      }

    default:
      return state
  }
}