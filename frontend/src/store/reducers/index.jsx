import { combineReducers } from 'redux'

import User from './User'
import Notification from './Notification'
import Setting from './Setting'

export default combineReducers({
    User,
    Notification,
    Setting,
})