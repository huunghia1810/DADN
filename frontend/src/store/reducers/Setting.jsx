import * as constantSetting from '../../constants/Setting'

const initialState = {
  fetching: false,
  settings: {
    fanMode: 1,
    fanSpeed: 0,
    ledBuzz: 1,
    buzzLoudness: 0,
    sendSMS: 1,
  },
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constantSetting.SETTING_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        settings:{},
        error: null,
      }
    case constantSetting.SETTING_GET_DATA_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        fetching: false,
        settings: data ? data[0] : {},
        error: null,
      }
    case constantSetting.SETTING_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        settings:{},
        error: action.payload,
      }

    default:
      return state
  }
}