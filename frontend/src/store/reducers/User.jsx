//---------import constant---------
import * as constantUser from '../../constants/User'

const initialState = {
    fetching: false,
    authInfo: {},
    error: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constantUser.USER_AUTH_PROCESSING:
            return {
                ...state,
                fetching: true,
                authInfo: {},
                error: null,
            }
        case constantUser.USER_AUTH_SUCCESS:
            return {
                ...state,
                fetching: false,
                authInfo: action.payload,
                error: null,
            }
        case constantUser.USER_AUTH_FAIL:
            return {
                ...state,
                fetching: false,
                authInfo: {},
                error: action.payload,
            }

        case constantUser.USER_REGISTER_REQUEST_PROCESSING:
            return {
                ...state,
                fetching: true,
                authInfo: {},
                error: null,
            }
        case constantUser.USER_REGISTER_REQUEST_SUCCESS:
            debugger
            return {
                ...state,
                fetching: false,
                authInfo: action.payload,
                error: null,
            }
        case constantUser.USER_REGISTER_REQUEST_FAIL:
            return {
                ...state,
                fetching: false,
                authInfo: {},
                error: action.payload,
            }

        case constantUser.USER_AUTH_SIGN_OUT_PROCESSING:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case constantUser.USER_AUTH_SIGN_OUT_SUCCESS:
            return {
                ...state,
                fetching: false,
                authInfo: {},
                error: null,
            }
        case constantUser.USER_AUTH_SIGN_OUT_FAIL:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        default:
            return state
    }
}