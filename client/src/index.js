import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';
// context socket
import {socket, socketContext} from './config/socket';

ReactDOM.render(
  <React.StrictMode>
    <socketContext.Provider value={socket}>
      <Provider store={store}>
        <App />
      </Provider>
    </socketContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
