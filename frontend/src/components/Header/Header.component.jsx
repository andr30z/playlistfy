import React from 'react';

import "./Header.styles.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteToken } from '../../redux/TokenActions';
import { userLogOut } from '../../redux/UserActions';
import { resetSideffects } from '../../redux/SideEffectsActions';

const Header = () => {
    const { sideEffects: { isHome, isMenu }, user: { currentUser } } = useSelector(state => state);
    const dispatch = useDispatch();

    const onClickLogOut = () => {
        dispatch(resetSideffects());
        dispatch(deleteToken());
        dispatch(userLogOut());
    }


    return (
        <header className='headerContainer'
            style={isHome ?
                { justifyContent: 'flex-end' } :
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }
            }>
            <div style={{ marginRight: isHome ? "10%" : 0 }}>
                <h1>Playlistfy</h1>
            </div>
            {
                !isHome && currentUser ?
                    <nav className="navHeader">
                        <li>
                            <a href={isMenu ? "#artistas" : "/menu#artistas"}>Artistas</a>
                            <a href={isMenu ? "#tracks" : "/menu#tracks"}>Tracks</a>
                            <Link
                                to='/'
                                onClick={onClickLogOut}
                            >
                                Logout
                            </Link>
                        </li>
                    </nav> : null
            }
        </header >
    )
}

export default Header;
