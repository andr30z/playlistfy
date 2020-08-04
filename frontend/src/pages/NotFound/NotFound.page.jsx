import React from 'react';

import './NotFound.styles.css';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div className="not-found-container">
            <img alt="ERROR 404" src={require('../../assets/404.svg')} />
            <Link to="/">Ir para a Home</Link>
        </div>
    )
}

export default NotFound;
