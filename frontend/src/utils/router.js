import React from 'react'
import _ from 'lodash'
import { Route } from 'react-router-dom'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { createBrowserHistory } from 'history'

import LoadingSpinner from './../components/LoadingSpinner/LoadingSpinner'

import { LIST_PATH } from './../constants/Paths'

const locationHelper = locationHelperBuilder({})
const history = createBrowserHistory()

const AUTHED_REDIRECT = 'AUTHED_REDIRECT'
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT'

/**
 * Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/sign-in',
    AuthenticatingComponent: LoadingSpinner,
    wrapperDisplayName: 'UserIsAuthenticated',
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: ({ User }) => {
        return !_.isUndefined(User.authInfo.accessToken)
    },
    // Returns true if the user auth state is loading
    authenticatingSelector: ({ User }) => {
        return User.fetching
    },
    redirectAction: newLoc => dispatch => {
        // Use push, replace, and go to navigate around.
        history.push(newLoc)
        dispatch({
            type: UNAUTHED_REDIRECT,
            payload: { message: 'User is not authenticated.' }
        })
    }
})

/**
 * Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
    AuthenticatingComponent: LoadingSpinner,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    allowRedirectBack: true,
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: ({ firebase: { auth } }) => auth.isEmpty,
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
        !auth.isLoaded || isInitializing,
    redirectPath: (state, ownProps) => {
        /*console.log('locationHelper.getRedirectQueryParam_________', locationHelper.getRedirectQueryParam(ownProps));
        console.log('ownProps______________', ownProps);
        console.log('state______________', state);*/
        return locationHelper.getRedirectQueryParam(ownProps) || LIST_PATH
    },
    redirectAction: newLoc => dispatch => {
        // Use push, replace, and go to navigate around.
        history.push(newLoc)
        dispatch({
            type: AUTHED_REDIRECT,
            payload: { message: 'User is not authenticated.' }
        })
    }
})

/**
 * Render children based on route config objects
 * @param {Array} routes - Routes settings array
 * @param {Object} match - Routes settings array
 * @param {Object} parentProps - Props to pass to children from parent
 */
export function renderChildren(routes, match, parentProps) {
    return routes.map(route => (
        <Route
            key={`${match.url}-${route.path}`}
            path={`${match.url}/${route.path}`}
            render={props => <route.component {...parentProps} {...props} />}
        />
    ))
}
