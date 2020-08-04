import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, hasToken } from './auth';

const VerificationRoute = ({ component: Component, pathname, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    isAuthenticated() && hasToken() && props.location.state ?
                        <Component {...props} />
                        :
                        <Redirect to={{ pathname: '/playlist', state: { from: props.location, shouldDiplayAlert: true } }} />
                )
            }

            } />
    )
}

export default VerificationRoute;
