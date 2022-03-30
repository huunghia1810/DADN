import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom'

import {Provider} from 'react-redux'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Main from './components/layout/Main'
import PageNotFound from './components/layout/PageNotFound/PageNotFound'
import { UserIsAuthenticated } from './utils/router'

import 'antd/dist/antd.css'
import './assets/styles/main.css'
import './assets/styles/responsive.css'

import store from './store/store'

const App = props => {

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
