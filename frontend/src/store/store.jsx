import { applyMiddleware, createStore, compose } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

// develop environment
//const middleware = applyMiddleware(promise, thunk, logger)
const middleware = compose(applyMiddleware(promise, thunk))

export default createStore(
    reducer,
    composeWithDevTools(middleware)
)
