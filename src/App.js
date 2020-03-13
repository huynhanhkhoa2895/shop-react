import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Page/Layout.js';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import appReducers from './reducer/index';
const store = createStore(
	appReducers, /* preloadedState, */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
  );
}

export default App;
