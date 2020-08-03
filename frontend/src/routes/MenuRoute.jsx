import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ component: Component, pathname, location, ...rest }) => {

    console.log("propento location ", location)
    return (
        <Route
            {...rest}
            render={props => {
                console.log("propento ", props.location)
                return isAuthenticated() || props.location.state.from.pathname === "/log" ?
                    <Component {...props} />
                    :
                    <Redirect to={{ pathname, state: { from: props.location } }} />

            }

            } />
    )
}

export default PrivateRoute;
