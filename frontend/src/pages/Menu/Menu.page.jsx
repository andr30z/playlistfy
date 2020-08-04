import React, { useEffect, useState } from 'react';

import './Menu.styles.css';

import MenuLanding from '../../components/MenuLanding/MenuLanding.component';
import UserInfo from '../../components/UserInfo/UserInfo.component';

import Hoc from '../../components/Hoc/Hoc.component';

// import { setCurrentUser } from '../../redux/UserActions';
import { useSelector, useDispatch } from 'react-redux';

// import Axios from 'axios';
import auth from '../../services/api';
// import checkUserTo from '../../utils/checkUserTo';
// import { setToken } from '../../redux/TokenActions';
import { isSomething } from '../../redux/SideEffectsActions';
import { loadUserData } from '../../redux/UserActions';
import { is401, useAsyncError } from '../../utils/utilFunctions';
// import useRefreshToken from '../../utils/useRefreshToken';

const UserHoc = Hoc(UserInfo);
const MenuHoc = Hoc(MenuLanding);

const Menu = () => {

    const throwError = useAsyncError();

    const { user: { currentUser, userData }, to, sideEffects } = useSelector(state => state);

    const [personalizationIsLoading, setPersonalizationIsLoading] = useState(false);
    // const [userIsLoading, setUserIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isSomething(true, 'isMenu'))
        if (!sideEffects.isLoggin) {
            setPersonalizationIsLoading(true);
            auth.get("user/data-personalization", {
                params: { Authorization: to.access_token }
            }).then(res => {
                dispatch(loadUserData({ artists: res.data.art, tracks: res.data.tracks }));
                setPersonalizationIsLoading(false);
            }).catch(error => {
                if (is401(error)) {
                    throwError("Sua sessão expirou, por favor efetue o login novamente");
                }
            });
        }
        return ()=>dispatch(isSomething(false, 'isMenu'));
        // eslint-disable-next-line
    }, []);


    return (
        <div className="menuContainer">
            <section id="whatweknow">
                <MenuHoc
                    isLoading={sideEffects.isLoggin}
                    userName={currentUser ? currentUser.display_name : ""}
                    spinnerSize={'90vh'}
                    spinnerColor={{
                        border: '3px solid #0470DC',
                        borderTop: '#fff'
                    }}
                />
            </section>
            <section id="artistas" >
                <UserHoc
                    spinnerColor={{
                        border: '3px solid #0470DC',
                        borderTop: '#fff'
                    }}
                    data={userData ? userData.artists : []}
                    spinnerSize={'100vh'}
                    isLoading={sideEffects.isLoggin ? sideEffects.isLoggin : personalizationIsLoading}
                    imgUrl="Playlist-bro"
                    customCallText={"O que sabemos sobre seu gosto musical"}
                    customTitle="Seus Artistas preferidos:"
                />
            </section>
            <section id="tracks">
                <UserHoc
                    spinnerColor={{
                        border: '3px solid #0470DC',
                        borderTop: '#fff'
                    }}
                    spinnerSize={'100vh'}
                    isLoading={sideEffects.isLoggin ? sideEffects.isLoggin : personalizationIsLoading}
                    data={userData ? userData.tracks : []}
                    customStyle={'inverse'}
                    imgUrl={"fav-bro"}
                    customTitle="Suas musicas preferidas:"
                />
            </section>

        </div>
    )
}

export default Menu;
