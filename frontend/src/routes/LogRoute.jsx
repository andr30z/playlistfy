import React, { useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';

import auth from '../services/api';

import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import { setCurrentUser, loadUserData } from '../redux/UserActions';
import { setToken } from '../redux/TokenActions';
import { isSomething } from '../redux/SideEffectsActions';
import Axios from 'axios';
import { useAsyncError, is401 } from '../utils/utilFunctions';



const LogRoute = ({ pathname, location, ...rest }) => {
    const { user: { currentUser } } = useSelector(state => state);
    const dispatch = useDispatch();
    const history=useHistory();
    const throwError = useAsyncError();

    useEffect(() => {
        // throwError({currentUser})
        if (!currentUser) {
            const UrlQueryStrings = location.search;
            const queryValues = queryString.parse(UrlQueryStrings, "   urlquery   ");
            if (queryValues.error) {
                alert('Você não autorizou nossa aplicação :(');
                history.push('/');
                return;
            }
            if (queryValues.code && !currentUser) {

                dispatch(isSomething(true, 'isLoggin'))
                loadUser(queryValues.code)
                    .catch(error => {
                        if (is401(error)) {
                            throwError("Sua sessão expirou, por favor efetue o login novamente");
                         }
                    })
            }
        }
        // history.push('/menu');
        // eslint-disable-next-line
    }, []);

    function loadUser(code) {
        return auth.get('auth', {
            params: {
                code: code
            }
        })
            .then(res => {
                dispatch(setToken('SET_TOKEN', { ...res.data, createdAt: new Date().getTime() }));

                return Axios.all([
                    auth.get('user', {
                        params: {
                            Authorization: res.data.access_token
                        }
                    }),
                    auth.get('user/data-personalization', {
                        params: {
                            Authorization: res.data.access_token
                        }
                    })]
                );
            }).then(Axios.spread((currentUserRes, userDataRes) => {
                dispatch(setCurrentUser(currentUserRes.data));
                dispatch(loadUserData({ artists: userDataRes.data.art, tracks: userDataRes.data.tracks }))
                dispatch(isSomething(false, 'isLoggin'))
            }));

    }

    return <Route
        {...rest}
        render={props => {
            return <Redirect to={{ pathname: '/menu', state: { from: props.location } }} />
        }
        } />
    // ) :
    //     (<Route
    //         {...rest}
    //         render={() => {
    //             return <Spinner
    //                 spinnerSize={'90vh'}
    //                 spinnerColor={{
    //                     border: '3px solid #0470DC',
    //                     borderTop: '#fff'
    //                 }}
    //             />
    //         }
    //         } />)
}

export default LogRoute;
