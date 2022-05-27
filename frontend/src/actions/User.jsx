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
    update(data, id, callbackSuccess = false) {
        return function (dispatch) {
            dispatch({type: constantUser.USER_UPDATE_PROCESSING})
            feathersClient.service('users').patch(id, data).then(res => {
                dispatch({type: constantUser.USER_UPDATE_SUCCESS, payload: res})
                if(typeof callbackSuccess == 'function') {
                    callbackSuccess(res)
                }
            }).catch(error => {
                dispatch({type: constantUser.USER_UPDATE_FAIL, payload: error})
            })
        }
    }
    signIn({email, password, ...data}) {
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

    async changePassword({oldPassword, password}, callbackError) {
        let res
        try {
            res = await feathersClient.service('user-change-password').create({oldPassword, password})
        } catch (e) {
            callbackError(e)
            throw e
        }
        return res
    }
    signUp(data, callbackSuccess, callbackError) {
        return function (dispatch) {
            dispatch({type: constantUser.USER_REGISTER_REQUEST_PROCESSING})
            feathersClient.service('users').create(data).then(res => {
                callbackSuccess(res)
                //const { email, password } = res
                //dispatch(this.signIn({email, password}))
                //dispatch({type: constantUser.USER_REGISTER_REQUEST_SUCCESS, payload: res})
                //this.setState({products: res.data})
            }).catch(error => {
                callbackError(error)
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
    getUsers(limit = 5) {
        return function (dispatch) {
            dispatch({type: constantUser.USER_GET_DATA_PROCESSING})
            const query = {
                query: {
                    $sort: {id: -1},
                    $limit: limit //default 5 newest users
                }
            }

            feathersClient.service('users').find(query)
              .then(response => {
                  dispatch({type: constantUser.USER_GET_DATA_SUCCESS, payload: response})
              }).catch(error => {
                dispatch({type: constantUser.USER_GET_DATA_FAIL, payload: error.message})
            })
        }
    }
}

export default new ActionUser()