import * as constantGasData from '../../constants/GasData'

const initialState = {
  fetching: false,
  listGasData: [],
  total: 0,
  limit: 0,
  skip: 0,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constantGasData.GASDATA_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        listGasData: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: null,
      }
    case constantGasData.GASDATA_GET_DATA_SUCCESS:
      const { total, limit, skip, data, type } = action.payload
      return {
        ...state,
        fetching: false,
        listGasData: data,
        totalUnread: total,
        limitUnread: limit,
        skipUnread: skip,
        error: null,
      }
    case constantGasData.GASDATA_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listGasData: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: action.payload,
      }

    default:
      return state
  }
}