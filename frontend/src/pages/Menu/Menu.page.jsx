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
// import useRefreshToken from '../../utils/useRefreshToken';

const UserHoc = Hoc(UserInfo);
const MenuHoc = Hoc(MenuLanding);

const Menu = () => {


    const { user: { currentUser, userData }, to, sideEffects } = useSelector(state => state);
    const state = useSelector(state => state);

    const [personalizationIsLoading, setPersonalizationIsLoading] = useState(false);
    // const [userIsLoading, setUserIsLoading] = useState(true);

    const dispatch = useDispatch();


    // async function check() {
    //     if (to.createdAt !== -1 && to.expires_in) {
    //         const updatedTo = await checkUserTo(to.createdAt, to.refresh_token)
    //             .then(res => {
    //                 if (!res) {
    //                     console.log("inside res check ", res)
    //                     return res;
    //                 }
    //                 console.log("res data check ", res.data);
    //                 return res.data
    //             })
    //             .catch(error => ({ error, errorMessage: 'Não foi possivel recuperar o token :(' }));
    //         console.log("aaaa", updatedTo)
    //         if (updatedTo) {
    //             console.log(to, " before running the check")
    //             dispatch(setToken('SET_TOKEN', { ...updatedTo, createdAt: new Date().getTime() }));
    //         }
    //     }
    // }

    useEffect(() => {
        dispatch(isSomething(true, 'isMenu'))
        console.log('disparei')
        // check();
        // useRefreshToken();
        // const errorMes={errorMessage:'acess token'}
        console.log(state, " state ziaca akkasldklasjdkl")
//   throw new Error (errorMes)
        console.log(sideEffects.isLoggin, 'isloggin')
        if (!sideEffects.isLoggin) {
            setPersonalizationIsLoading(true);
            auth.get("user/data-personalization", {
                params: { Authorization: to.access_token }
            }).then(res => {
                dispatch(loadUserData({ artists: res.data.art, tracks: res.data.tracks }));
                setPersonalizationIsLoading(false);
                // dispatch(isSomething(false,'isLoggin'))
            }).catch(error=> console.log(error, 'error catch'));
        }
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
                    isLoading={sideEffects.isLoggin?sideEffects.isLoggin:personalizationIsLoading}
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
                    isLoading={sideEffects.isLoggin?sideEffects.isLoggin:personalizationIsLoading}
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
