import React from 'react'

const PlaylistTable = ({playlist_data}) => {
    return (
        <table className="fl-table">
            <thead>
                <tr>
                    <th>Música</th>
                    <th>Álbum</th>
                    <th>Artista</th>
                </tr>
            </thead>
            <tbody>

                {
                    playlist_data.tracks.map(track => (
                        <tr key={track.name} className="tr-title th-container">
                            <th title={track.name}>{track.name}</th>
                            <th title={track.album.name}>{track.album.name}</th>
                            <th title={track.album.artists[0].name}>{track.album.artists[0].name}</th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default React.memo(PlaylistTable);
