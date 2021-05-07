import React, { useCallback } from "react";

import { useHistory } from "react-router-dom";

import "./MenuLanding.styles.css";
import CustomButton from "../CustomButton/CustomButton.component";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

const MenuLanding = ({ userName }) => {
  const history = useHistory();

  const toPlaylistPage = useCallback(() => {
    history.push("/playlist");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="menuLandingContainer">
      <div className="left">
        <div className="textContainer slide-right">
          <h1>Olá, {userName}</h1>
          <h2>Vamos começar?</h2>
          <h3>Escolha o que deseja fazer:</h3>
          <div className="actions slide-left">
            <CustomButton
              text="Gerar Playlist"
              customStyle="generateStyle"
              onSubmit={toPlaylistPage}
              shouldUseIcon={true}
            />
            <div className="actions-more">
              <span>Ver informações</span>
              <a href="#artistas">
                <Icon className="faDown" icon={faAngleDoubleDown} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="svg">
        <img
          src={require("../../assets/music-bro.svg")}
          alt="cool guy relaxing and listening some music"
        />
      </div>
      <img
        src={require("../../assets/wave.svg")}
        alt="background"
        className="background"
      />
    </div>
  );
};

export default React.memo(MenuLanding);
