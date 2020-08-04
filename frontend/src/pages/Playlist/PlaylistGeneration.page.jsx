import React, { useState, useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from '../../redux/SideEffectsActions';

import SearchField from '../../components/SearchField/SearchField.component';
import SearchResults from '../../components/SearchResults/SearchResults.component';
import CustomButton from '../../components/CustomButton/CustomButton.component';

import "./PlaylistGeneration.styles.css";

import auth from '../../services/api';
import { debounce } from 'lodash';
import {useAsyncError, is401} from '../../utils/utilFunctions';

const PlaylistGeneration = (props) => {

    const dispatch = useDispatch();
    const to = useSelector(state => state.to);
    const throwError = useAsyncError();

    const [search, setSearch] = useState({ search: '', pickedValue: undefined });
    const [searchData, setSearchData] = useState({});
    const [searchIsLoading, setSearchIsLoading] = useState(true);
    const [hideBar, setHideBar] = useState(true);

    useEffect(() => {
        dispatch(changeColor("#fff", "SIDE_EFFECT_FOOTER"));

        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (search !== "" && !search.pickedValue && search.search.trim().length > 0) {
            setHideBar(false);
            setSearchIsLoading(true);
            handler(search.search);
            return;
        }

        if (search.pickedValue && search.pickedValue.name !== search.search) {
            setSearch({ ...search, pickedValue: undefined });
            setHideBar(false);
            return;
        }
        if (!hideBar || !search.pickedValue) {
            setHideBar(true)
        }


        // eslint-disable-next-line
    }, [search]);

    const history = useHistory();

    const onSubmit = useCallback(() => {
        if (search.pickedValue) {
            history.push('/playlist/verification', { ...search, fromPlaylist: true });
            return;
        }
        // eslint-disable-next-line
    }, [search.pickedValue]);

    const handler = useCallback(debounce((search) => {
        auth.get('search', {
            headers: {
                q: search,
                to: to.access_token
            }
        }).then(res => {
            setSearchData(res.data);
            setSearchIsLoading(false)
        }).catch(error => {
            if (is401(error)) {
                throwError("Sua sessão expirou, por favor efetue o login novamente");
             }
        });
        // eslint-disable-next-line
    }, 1000), []);

    const onClickIcon = (item) => {
        // A ORDEM IMPORTA
        setSearch({ search: item.name, pickedValue: item });
    }

    return (
        <div className="playlistContainer wrapper">
            <div className="headphone text-focus-in" />
            <div className="searchContainer">
                <div className="explanation-container text-focus-in">
                    <p>
                        Para um resultado melhor na playlist final,
                        precisamos primeiro de uma direção sobre quais
                        tipos de música você quer descobrir.
                    </p>
                </div>
                <div className="contentSearch">
                    <SearchField
                        search={search.search}
                        setSearch={setSearch}
                    />
                    <SearchResults
                        isLoading={searchIsLoading}
                        hideBar={hideBar}
                        onClickIcon={onClickIcon}
                        searchData={searchData}
                    />
                </div>
                <CustomButton text="Playlistfy!" onSubmit={onSubmit} customStyle="button-playlist boxshadow slide-left" />
            </div>
        </div>
    )
}

export default PlaylistGeneration;
