import AuthListenerProvider from 'context/authListener.context';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store';
import App from './App';
import './index.css';

ReactDOM.render(
   <Provider store={store}>
      <AuthListenerProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </AuthListenerProvider>
   </Provider>,
   document.getElementById('root')
);
