import { combineReducers } from 'redux'

import User from './User'
import Notification from './Notification'
import Alert from './Alert'
import Setting from './Setting'
import Device from './Device'
import GasLeak from './GasLeak'
import GasData from './GasData'

export default combineReducers({
    User,
    Notification,
    Alert,
    Setting,
    Device,
    GasLeak,
    GasData,
})