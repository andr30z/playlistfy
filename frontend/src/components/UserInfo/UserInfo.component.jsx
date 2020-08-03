import React, { useState } from 'react';
import './UserInfo.styles.css';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { InView } from 'react-intersection-observer'

const UserInfo = ({ data, imgUrl, customStyle, customCallText, customTitle }) => {

    const [animationLimiter, setAnimationLimiter] = useState(false);
    return (
        <div className="userInfo">
            <h1 className={animationLimiter ? "topTitle slide-right" : ""}>{customCallText}</h1>
            <InView className={`userInfoContent ${customStyle}`} onChange={(inView) => {
                if (!animationLimiter && inView) {
                    setAnimationLimiter(!animationLimiter)
                }
            }}
            >
                <div className="musicguyContainer">
                    <img className={animationLimiter ? "slide-right text-focus-in" : ""} alt="cool guy listening some music" src={require(`../../assets/${imgUrl}.svg`)} />
                </div>
                <div className="weknow">
                    <div className={animationLimiter ? "title tracking-in-expand" : ""}>
                        <Icon className="spotify" icon={faSpotify} />
                        <h2>{customTitle}</h2>
                    </div>
                    <div className={animationLimiter ? "mid-inf slide-left" : ""}>
                        <div
                            className="artist"
                        >
                            {
                                data.map(artist => {
                                    return (
                                        <div title={artist.name}
                                            key={String(artist.name + artist.id)}
                                            className="imageContainer"
                                        >
                                            <div className="shadow">
                                                <img
                                                    src={artist.album ? artist.album.images[1].url : artist.images[2].url}
                                                    alt="artista"
                                                />
                                            </div>
                                            <h4>{artist.name}</h4>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </InView>
        </div>

    )
}

export default UserInfo;
