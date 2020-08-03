import React from 'react';
import './SearchResults.styles.css'
import ResultItems from '../ResultItems/ResultItems.component';
import Hoc from '../Hoc/Hoc.component';

const ResultItemsHoc = Hoc(ResultItems);


const SearchResults = ({ hideBar, isLoading, searchData, onClickIcon }) => {

    return (
        <div className={`${hideBar ? 'hide' : "slide-in-blurred-top"} searchResultContainer`} >
            <ResultItemsHoc
                isLoading={isLoading}
                search={searchData}
                onClickIcon={onClickIcon}
                spinnerSize={'100px'}
                spinnerColor={{
                    border: '3px solid #0470DC',
                    borderTop: '#fff',
                }}
                titleMessage="Artistas"
                listItem={searchData.artists}
                altContent="Imagem de perfil do artista"
            />
            <ResultItemsHoc
                isLoading={isLoading}
                search={searchData}
                onClickIcon={onClickIcon}
                spinnerSize={'100px'}
                spinnerColor={{
                    border: '3px solid #0470DC',
                    borderTop: '#fff',
                }}
                titleMessage="Músicas"
                listItem={searchData.tracks}
                altContent="Imagem do album" />
        </div>
    )
}

export default SearchResults;
