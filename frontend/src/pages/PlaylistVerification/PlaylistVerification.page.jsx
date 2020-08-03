import React, { useCallback, useState, useEffect } from 'react';

import './PlaylistVerification.styles.css';

import CustomButton from '../../components/CustomButton/CustomButton.component';
import CustomModal from '../../components/CustomModal/CustomModal.component';
import PlaylistTable from '../../components/PlaylistTable/PlaylistTable.component';
import Hoc from '../../components/Hoc/Hoc.component';

import { useHistory } from 'react-router-dom';

import auth from '../../services/api';

import { useSelector, useDispatch } from 'react-redux';
import { changeColor } from '../../redux/SideEffectsActions';

const TableHoc = Hoc(PlaylistTable);

const PlaylistVerification = ({ location }) => {


    const [dataModal, setDataModal] = useState({ toggleModal: false, error: null });
    const [inputValue, setInputValue] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(true);

    const dispatch = useDispatch();
    const { to, user } = useSelector(state => state);

    const history = useHistory();
    // const { fromPlaylist } = location.state;


    useEffect(() => {
        // if (!location) {
        //     history.goBack();
        //     return;
        // }

        dispatch(changeColor("#fff", "SIDE_EFFECT_FOOTER"));

        const params = [];
        const choosed = location ? location.state.pickedValue : {genres:false};
        console.log(choosed, " CHOOSED")


        if (choosed.genres) {
            const artistArray = {
                genres: choosed.genres,
                href: choosed.href,
                artistUrl: choosed.href + "/top-tracks"
            };
            params.push(artistArray);
        } else {
            const track = { artistUrl: choosed.artists[0].href };
            params.push(track);
        }

        const id = choosed.id;
        params.push({ id });
        params.push({ to: to.access_token });
        console.log('params   ',params);

        auth.get('/generate-playlist', {
            params: {
                params
            }
        }).then(res => {
            setPlaylist(res.data);
            setIsLoadingPlaylist(false);
        }).catch(error => {
            setPlaylist({ errorMessage: error.response.data });
        });
        // eslint-disable-next-line
    }, []);

    const onSubmit = useCallback(() => {

        const name = inputValue !== "" && inputValue.trim().length > 0 ? inputValue : "Playlistfy :D";
        console.log(inputValue)
        const playlistSongs = playlist.tracks.map(song => song.uri);
        const data = {
            userId: user.currentUser.id,
            name: name,
            source: location.state.search,
            playlist: { uris: playlistSongs }
        }
        auth.post('/create-playlist', data, {
            headers: {
                to: to.access_token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(dataModal)
                setDataModal({ toggleModal: !dataModal.toggleModal, error: null });
            })
            .catch(error => {
                console.log("errrrrrrrrooooo")
                setDataModal({ toggleModal: false, error: error.response.data })
            }
            );
        // eslint-disable-next-line
    }, [playlist, inputValue]);

    const anotherOne = useCallback(() => {
        history.push('/playlist');
        // eslint-disable-next-line
    }, []);

    const onChange = useCallback((value) => {
        setInputValue(value)
        // eslint-disable-next-line
    }, []);

    const closeModal = useCallback(() => {
        setDataModal({ ...dataModal, toggleModal: false });
    }, [dataModal]);

    return (
        <div className="playlist-verification">

            <div className="title-container slide-left">
                <div className="playlist-title-container">
                    <h1 className="playlist-title">Playlist final</h1>
                </div>
                <div className="input-playlist-container">
                    <p><span>Dê um nome para sua playlist:</span></p>
                    <input
                        value={inputValue}
                        onChange={(event) => onChange(event.target.value)}
                        type="text"
                        className="input-content boxshadow"
                        placeholder="EX:PlaylistManeira123"
                        autoComplete="off"
                        spellCheck={false}
                        maxLength={40}
                    />
                </div>
            </div>
            <div className="table-container text-focus-in">
                {
                    playlist.errorMessage ? <div className="error-container">
                        <h1 className="error">{playlist.errorMessage}</h1>
                    </div>
                        :
                        <TableHoc
                            isLoading={isLoadingPlaylist}
                            playlist_data={playlist}
                            spinnerSize={'300px'}
                            spinnerColor={{
                                border: '3px solid #0470DC',
                                borderTop: '#fff'
                            }}
                        />
                }
            </div>
            <div className="button-container">
                {isLoadingPlaylist || playlist.errorMessage ?
                    null :
                    <CustomButton
                        onSubmit={onSubmit}
                        customStyle={'add-to-profile button-size slide-right'}
                        text="Adicionar no Spotify"
                        shouldUseIcon={true}
                    />

                }
                <CustomButton
                    onSubmit={anotherOne}
                    customStyle="another-one button-size slide-left"
                    text="Gerar outra playlist"
                    shouldUseIcon={false}
                />
            </div>
            <CustomModal
                isOpen={dataModal.toggleModal}
                isError={dataModal.error}
                closeModal={closeModal}
            />
        </div>
    )
}

export default PlaylistVerification;
