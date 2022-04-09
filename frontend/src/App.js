import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Switch, Route, Redirect, BrowserRouter as Router, useHistory} from 'react-router-dom'
import _ from 'lodash'

import feathersClient from './feathersClient'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Main from './components/layout/Main'
import ModalDialogs from './components/ModalDialogs/ModalDialogs'
import PageNotFound from './components/layout/PageNotFound/PageNotFound'
import { UserIsAuthenticated } from './utils/router'

import 'antd/dist/antd.css'
import './assets/styles/main.css'
import './assets/styles/responsive.css'

const [errorModalDialogs] = ModalDialogs(['error'])

const App = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    handleServiceError()
  },[])

  const handleServiceError = () => {
    feathersClient.hooks({
      error(context) {
        if(context.service.path !== 'users'
          || (context.service.path === 'users' && context.method !== 'create')) { //context.data.strategy = local -> login
          errorModalDialogs.show({
            title: 'Error',
            content: context.error.message,
            okText: 'Ok',
            onOk() {
              if(context.error.code == 403) {
                //history.push('/dashboard')
                window.location.replace('/dashboard')
              } else {
                //window.location.href('/sign-in')
              }
            },
            error: context.error
          })
        }
      }
    })
  }

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/sign-in' exact component={SignIn} />
          <Route path={'/:entity'} component={UserIsAuthenticated(Main)} />
          <Route path={'/:entity/:action'} component={UserIsAuthenticated(Main)} />
          <Route path={'/:entity/:action/:id'} component={UserIsAuthenticated(Main)} />
          <Route path='/' exact component={SignIn}></Route>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
