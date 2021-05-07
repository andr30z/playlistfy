import React from 'react';

import './Footer.styles.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';

const Footer = () => {

    const color = useSelector(state => state.sideEffects.footerColor);
    const colorStyle = {
        color: color === 'transparent' ? '#fff' : '#4F79A4'
    }
    return (
        <footer className="footerContainer" style={{
            backgroundColor: color,
            color: colorStyle.color

        }}>
            <div className="midrow">
                <p>Criado por André Luiz (@andr30z)</p>
                <div className="iconContainer">
                    <div>
                        <a
                            className="credit-link"
                            style={{ ...colorStyle, marginRight: "20px" }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/andr30z">
                            <Icon className="icon-git" icon={faGithub} />
                        </a>
                        <a
                            className="credit-link"
                            style={colorStyle}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/andr3zinh000">
                            <Icon className="icon-twt" icon={faTwitter} />
                        </a>
                    </div>
                    <a
                        className="credit-link"
                        style={colorStyle}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://stories.freepik.com/app">
                        Illustration by Stories by Freepik
                    </a>

                </div>
            </div>
        </footer>
    )
}

export default Footer;
