import React from 'react';

import './CustomButton.styles.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const CustomButton = ({ text, customStyle, onSubmit, shouldUseIcon }) => {
    return (
        <button type="button" onClick={() => onSubmit()} className={`${customStyle} default`}>
            {shouldUseIcon && <Icon className="spotify" icon={faSpotify} />}
            {text}
        </button>
    )
}

export default CustomButton;
