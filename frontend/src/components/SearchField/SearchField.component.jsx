import React, { useCallback } from 'react';

import './SearchField.styles.css';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const SearchField = ({ search, setSearch }) => {

    const location = useLocation();
    console.log(location, 'locationaaaajajaj')

    const onChange = useCallback((value) => {
        setSearch({ ...search, search: value });
        // eslint-disable-next-line
    }, [setSearch]);

    return (
        <div className="searchFieldContainer slide-right">
            <input
                id="inp"
                value={search}
                onChange={(event) => onChange(event.target.value)}
                type="text"
                className="inp-field boxshadow"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                required
            />
            <label htmlFor="inp" className={`${location.state? 'shake-vertical':''} ${search === "" ? 'lb' : 'puff'}`}>
                Procure um artista ou música
            </label>
            <div className="boxshadow icon-search-container">
                <Icon className="icon-search" icon={faSearch} />
            </div>
        </div>
    )
}

export default React.memo(SearchField);
