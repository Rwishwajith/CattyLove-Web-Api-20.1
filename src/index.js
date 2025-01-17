import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
    domain="dev-dlhdzgbr.us.auth0.com"
    clientId="3IeHa3C2uva9EVtXNgT6DzNmmRVkoVPc"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>

      <App />

    </React.StrictMode>

  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();