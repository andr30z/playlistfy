import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import "./Home.styles.css";

// import auth from '../../services/api';
import { useSelector, useDispatch } from "react-redux";

import { isSomething } from "../../redux/SideEffectsActions";
import { API_URL } from "../../services/api";
// import { setToken } from '../../redux/TokenActions';

const Home = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(isSomething(true, "isHome"));
    return () => {
      dispatch(isSomething(false, "isHome"));
    };
    // eslint-disable-next-line
  }, []);
  function redirect (url) {
    var ua        = navigator.userAgent.toLowerCase(),
        isIE      = ua.indexOf('msie') !== -1,
        version   = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9) {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
    else { 
        window.location.href = url; 
    }
}
  const onLinkClick = () => {
    if (user) {
      history.push("/menu");
      return;
    }

    redirect(`${API_URL}oauth`);
  };

  return (
    <div className="home-container">
      <div className="content">
        <h3 className="text-focus-in">
          Encontre músicas e artistas que combinam com seu gosto neste gerador
          de playlists para aqueles que adoram descobrir coisas novas.
        </h3>
        <h3 className="text-focus-in" id="enter">
          Entre com sua conta Spotify
        </h3>

        <button
          onClick={onLinkClick}
          className="button slide-right default"
          // eslint-disable-next-line
        >
          <span>Entrar</span>
        </button>
      </div>
      <div className="image-pana">
        <img
          className="text-focus-in"
          src={require("../../assets/Playlist-pana.svg")}
          alt="girl"
        />
      </div>
    </div>
  );
};

export default Home;
