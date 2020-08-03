import React from 'react';

import './NotFound.styles.css';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { isSomething } from '../../redux/SideEffectsActions';

const NotFound = () => {
    // const state=useSelector(state=>state);
    // console.log(state)
    // const dispatch=useDispatch();
    // useEffect(() => {
    //     dispatch(isSomething(false,'is404'));
    //     return ()=> dispatch(isSomething(true, 'is404'))
    // }, []);

    return (
        <div className="not-found-container">
            <img alt="ERROR 404" src={require('../../assets/404.svg')} />
            <Link to="/">Ir para a Home</Link>
        </div>
    )
}

export default NotFound;
