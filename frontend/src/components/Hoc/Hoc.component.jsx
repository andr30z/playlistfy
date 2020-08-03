import React from 'react'
import Spinner from '../Spinner/Spinner.component';

const Hoc = (WrappedComponent) => {
    const hocComponent = ({ isLoading, spinnerColor, spinnerSize, ...props }) => isLoading ? <Spinner spinnerColor={spinnerColor} spinnerSize={spinnerSize} /> : <WrappedComponent {...props} />;
    return hocComponent;
}

export default Hoc;