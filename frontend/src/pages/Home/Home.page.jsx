import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import "./Home.styles.css";


// import auth from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';

import { isSomething } from '../../redux/SideEffectsActions';
// import { setToken } from '../../redux/TokenActions';


const Home = (props) => {

  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(isSomething(true, 'isHome'));
    // if (!user) {
    //   const UrlQueryStrings = props.location.search;
    //   const queryValues = queryString.parse(UrlQueryStrings);
    //   if (queryValues.error) {
    //     alert('Você não autorizou nossa aplicação :(')
    //     return;
    //   }
    //   console.log(user)
    //   if (queryValues.code && !user) {
    //     dispatch(isSomething(true,'isLoggin'));
    //     getTokenAsync(queryValues.code)
    //       .then(data => {
    //         console.log(data, " data inside then")
    //         dispatch(setCurrentUser(data));
    //         history.push('/menu')
    //       })
    //       .catch(error => {
    //         // dispatch(onError(error));
    //         alert("Ops, aconteceu algum problema por favor verifique sua conexão de internet :(")
    //       })
    //   }
    // }
    return () => {
      dispatch(isSomething(false, 'isHome'));
    }
    // eslint-disable-next-line
  }, []);

  const onLinkClick = () => {
    console.log("tokennnnn", user)
    if (user) {
      history.push('/menu');
      return;
    }

    // dispatch(isSomething(true,'isLoggin'));

    window.open('http://localhost:3333/oauth', '_self');
  }

  return (
    <div className="home-container">
      <div className="content">
        <h3 className="text-focus-in">Encontre músicas e artistas que combinam com seu gosto neste gerador de playlists para aqueles que adoram descobrir coisas novas.</h3>
        <h3 className="text-focus-in" id='enter'>Entre com sua conta Spotify</h3>

        <button
          onClick={onLinkClick}
          className="button slide-right default"
        // eslint-disable-next-line
        >
          <span>Entrar</span>
        </button>
      </div>
      <div className="image-pana">
        <img className="text-focus-in" src={require('../../assets/Playlist-pana.svg')} alt="girl" />
      </div>
    </div>
  )
}

export default Home;
