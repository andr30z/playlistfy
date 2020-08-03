import React, { useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';

import auth from '../services/api';

import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import { setCurrentUser, loadUserData } from '../redux/UserActions';
import { setToken } from '../redux/TokenActions';
import { isSomething } from '../redux/SideEffectsActions';
import Axios from 'axios';



const LogRoute = ({ pathname, location, ...rest }) => {
    const { user: { currentUser } } = useSelector(state => state);
    const dispatch = useDispatch();
    const history=useHistory();

    useEffect(() => {
        if (!currentUser) {
            const UrlQueryStrings = location.search;
            console.log(UrlQueryStrings, "URLQUERY")
            const queryValues = queryString.parse(UrlQueryStrings, "   urlquery   ");
            if (queryValues.error) {
                alert('Você não autorizou nossa aplicação :(');
                history.push('/');
                return;
            }
            console.log(currentUser, "   useerrrrr")
            if (queryValues.code && !currentUser) {

                dispatch(isSomething(true, 'isLoggin'))
                loadUser(queryValues.code)
                    .catch(error => {
                        console.log(error, "errinho hihih")
                        alert("Ops, aconteceu algum problema por favor verifique sua conexão de internet :(")
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
                console.log(res.data, "  getTokenAsync")
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
                console.log(currentUserRes, userDataRes, "asuidhauishd")
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
