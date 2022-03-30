import * as constantUser from '../constants/User'

import feathersClient from './../feathersClient'

class ActionUser {
    checkAuth() {
        return function (dispatch) {
            dispatch({type: constantUser.USER_AUTH_PROCESSING})
            feathersClient.reAuthenticate().then(response => {
                dispatch({type: constantUser.USER_AUTH_SUCCESS, payload: response})
            }).catch(error => {
                dispatch({type: constantUser.USER_AUTH_FAIL, payload: error.message})
            })
        }
    }
    signOut() {
        return async function (dispatch) {
            dispatch({type: constantUser.USER_AUTH_SIGN_OUT_PROCESSING})
            await feathersClient.logout()
            dispatch({type: constantUser.USER_AUTH_SIGN_OUT_SUCCESS})
        }
    }
}

export default new ActionUser()