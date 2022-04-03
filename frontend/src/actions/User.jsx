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
    // signIn({email, password}) {
    //     return feathersClient.service('settings').find({
    //         query: {
    //             $sort: {
    //                 id: -1
    //             }
    //         }
    //     }).then(res => {
    //         debugger
    //         //this.setState({products: res.data})
    //     })
    // }
    signIn({email, password}) {
        return function (dispatch) {
            dispatch({type: constantUser.USER_AUTH_PROCESSING})
            feathersClient.authenticate({
                strategy: 'local',
                email,
                password
            }).then(res => {
                dispatch({type: constantUser.USER_AUTH_SUCCESS, payload: res})
            }).catch(error => {
                dispatch({type: constantUser.USER_AUTH_FAIL, payload: error})
            })
        }
    }
    signUp(data) {
        return function (dispatch) {
            dispatch({type: constantUser.USER_REGISTER_REQUEST_PROCESSING})
            feathersClient.service('users').create(data).then(res => {
                debugger
                //dispatch(this.signIn({email, password}))
                dispatch({type: constantUser.USER_REGISTER_REQUEST_SUCCESS, payload: res})
                //this.setState({products: res.data})
            }).catch(error => {
                dispatch({type: constantUser.USER_REGISTER_REQUEST_FAIL, payload: error})
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