import React from 'react';
import './App.css';

import Routes from './routes/routes';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storeConfig from './redux/store';

import Modal from 'react-modal';


// setUpApi(auth, storeConfig.store);
function App() {
  
  Modal.setAppElement('#root');

  return (
    <Provider store={storeConfig.store}>
      <PersistGate persistor={storeConfig.persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
