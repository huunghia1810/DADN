import * as constantSetting from '../../constants/Setting'

const initialState = {
  fetching: false,
  settingInfo: {
    fanMode: 0,
    fanSpeed: 0,
    ledBuzz: 0,
    buzzLoudness: 0,
    sendSMS: 0,
  },
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constantSetting.SETTING_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        settingInfo: {},
        error: null,
      }
    case constantSetting.SETTING_GET_DATA_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        fetching: false,
        settingInfo: data.length ? data[0] : {},
        error: null,
      }
    case constantSetting.SETTING_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        settingInfo: {},
        error: action.payload,
      }

    case constantSetting.SETTING_ADD_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        settingInfo: {},
        error: null,
      }
    case constantSetting.SETTING_ADD_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        settingInfo: action.payload,
        error: null,
      }
    case constantSetting.SETTING_ADD_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        settingInfo: {},
        error: action.payload,
      }

    default:
      return state
  }
}