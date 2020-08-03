import React, { useState, useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from '../../redux/SideEffectsActions';

import SearchField from '../../components/SearchField/SearchField.component';
import SearchResults from '../../components/SearchResults/SearchResults.component';
import CustomButton from '../../components/CustomButton/CustomButton.component';

import "./PlaylistGeneration.styles.css";

// import { setToken } from '../../redux/TokenActions';
// import checkUserTo from '../../utils/checkUserTo';
import auth from '../../services/api';
import { debounce } from 'lodash';

const PlaylistGeneration = (props) => {

    const dispatch = useDispatch();
    const to = useSelector(state => state.to);


    const [search, setSearch] = useState({ search: '', pickedValue: undefined });
    const [searchData, setSearchData] = useState({});
    const [searchIsLoading, setSearchIsLoading] = useState(true);
    const [hideBar, setHideBar] = useState(true);

    useEffect(() => {
        dispatch(changeColor("#fff", "SIDE_EFFECT_FOOTER"));

        // if (to.createdAt !== -1 && to.expires_in) {
        //     const updatedTo = checkUserTo(to.createdAt, to.refresh_token);
        //     if (updatedTo) {
        //         updatedTo.then(res => {
        //             dispatch(setToken('SET_TOKEN', { ...res.data, createdAt: new Date() }))
        //         })
        //     }
        // }

        // return () => dispatch(changeColor('transparent', "SIDE_EFFECT_FOOTER"));

        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (search !== "" && !search.pickedValue && search.search.trim().length > 0) {
            console.log('naskudhauishduio entrou primeiro if')
            setHideBar(false);
            setSearchIsLoading(true);
            handler(search.search);
            return;
        }

        if (search.pickedValue && search.pickedValue.name !== search.search) {
            console.log('huhihihihih')
            setSearch({ ...search, pickedValue: undefined });
            setHideBar(false);
            return;
        }
        console.log('hide bar ', hideBar)
        if (!hideBar || !search.pickedValue) {
            console.log('naskudhauishduio ultimo if')
            setHideBar(true)
        }


        // eslint-disable-next-line
    }, [search]);

    const history = useHistory();

    const onSubmit = useCallback(() => {
        console.log(search, ' search')
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
            console.log(res.data.artists.items, "artists asdkjasuijdias")
            console.log(res.data.tracks.items, "TRACKSS asdkjasuijdias")
            setSearchData(res.data);
            setSearchIsLoading(false)
        }).catch(error => {
            console.log(error)
        });
        // eslint-disable-next-line
    }, 1000), []);

    const onClickIcon = (item) => {
        // A ORDEM IMPORTA
        console.log(hideBar, ' hideBar no onclcick')
        console.log(search.pickedValue, " pickedValue Onclick");
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
                    // hideBar={hideBar}
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
