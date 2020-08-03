import React from 'react';
import './Spinner.styles.css';

const Spinner = ({spinnerColor, spinnerSize}) => {
    return (
        <div className="spinner-overlay" style={{
            height:spinnerSize
        }}>
            <div className="spinner-container" style={{
                border: spinnerColor.border,
                borderTopColor:spinnerColor.borderTop
            }}/>
        </div>
    )
}

export default Spinner;
