import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { CookiesProvider } from 'react-cookie';

import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom'

import { Store } from 'webext-redux';
import { Provider } from 'react-redux';

const proxyStore = new Store();

proxyStore.ready().then(() => {
  render(
    // <CookiesProvider>
    <Provider store={proxyStore}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </Provider>
    // </CookiesProvider>
    , document.getElementById('app'));
});
