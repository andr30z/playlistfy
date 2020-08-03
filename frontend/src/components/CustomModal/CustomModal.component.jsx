import React from 'react';

import Modal from 'react-modal';

import './CustomModal.styles.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton.component';


// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         width: '200px',
//         height: '200px',
//         borderRadius: '15px',
//     }
// };

Modal.setAppElement('#root');

const CustomModal = ({ closeModal, isOpen, isError }) => {
    // console.log("IS OPEN: ", isOpen)
    // console.log("ERRO: ", isError)
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            className="modal"
        >
            <div className="modal-container">
                <div className="modal-content">

                    <div className="inside-div">
                        {!isError ? (
                            <>
                                <Icon className="check" icon={faCheckCircle} />
                                <h3>Obrigado por usar o Playlistfy</h3>
                                <span>༼ つ ◕_◕ ༽つ</span>
                                <p>Sua playlist já foi criada, vai lá conferir :)</p>
                                <Link className="boxshadow" to="/menu">OK</Link>
                            </>
                        )
                            : (
                                <>
                                    <Icon className="check" icon={faExclamationCircle} />
                                    <p>
                                        Oooops... Algo aconteceu, tente novamente 
                                    </p>
                                    <span className="check emote">¯\_(ᗒᗩᗕ)_/¯</span>
                                    <CustomButton
                                        onSubmit={closeModal}
                                        customStyle="modal-button button-size boxshadow"
                                        text="OK"
                                        shouldUseIcon={false}
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(CustomModal);
