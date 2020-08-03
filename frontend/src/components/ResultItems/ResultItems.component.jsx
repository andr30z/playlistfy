import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ResultItems = ({ listItem, titleMessage, onClickIcon }) => {
    return (
        <>
            <h2>{titleMessage}</h2>

            {
                listItem.items.map(item => {
                    const operator = item.images ? item : item.album;
                    return (
                        <div key={item.id} className="searchItemsContainer">
                            <div className="itemImg">
                                <img
                                    src={operator.length > 0 || operator.images.length > 0 ?
                                        operator.images[2].url
                                        :
                                        require('../../assets/default.png')
                                    }
                                    alt={item.album ? item.album.name : item.name}
                                />
                            </div>
                            <div className="pdiv">
                                <p title={item.name}>{item.name}</p>
                            </div>
                            <div
                                onClick={() => {
                                    onClickIcon(item);
                                }}
                                className="icon-div-container icon-plus"
                            >
                                <Icon icon={faPlusCircle} />
                            </div>
                        </div>
                    )
                }

                )

            }
        </>
    )
}

export default ResultItems;
