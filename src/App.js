import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Layout from './Layout/Layout.js';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
