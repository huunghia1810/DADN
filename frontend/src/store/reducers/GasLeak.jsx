import * as constantGasLeak from '../../constants/GasLeak'

const initialState = {
  fetching: false,
  listGasLeaks: [],
  total: 0,
  limit: 0,
  skip: 0,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constantGasLeak.GASLEAK_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        listGasLeaks: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: null,
      }
    case constantGasLeak.GASLEAK_GET_DATA_SUCCESS:
      const { total, limit, skip, data, type } = action.payload
      return {
        ...state,
        fetching: false,
        listGasLeaks: data,
        totalUnread: total,
        limitUnread: limit,
        skipUnread: skip,
        error: null,
      }
    case constantGasLeak.GASLEAK_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listGasLeaks: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: action.payload,
      }

    default:
      return state
  }
}