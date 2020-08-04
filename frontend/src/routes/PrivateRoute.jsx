import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, hasToken } from './auth';

const PrivateRoute = ({ component: Component, pathname, location, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    isAuthenticated() && hasToken() ?
                        <Component {...props} />
                        :
                        <Redirect to={{ pathname, state: { from: props.location } }} />
                )
            }

            } />
    )
}

export default PrivateRoute;
