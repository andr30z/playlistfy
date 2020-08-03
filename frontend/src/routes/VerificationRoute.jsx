import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, hasToken } from './auth';

const VerificationRoute = ({ component: Component, pathname, ...rest }) => {

    // console.log("verification propento location ", location);
    return (
        <Route
            {...rest}
            render={props => {
                console.log(" private ", props.location)
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
