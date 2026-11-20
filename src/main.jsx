import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './app/app';
import {readSettings, safeStorage} from './app/settings';

const storage = safeStorage();
const initial = readSettings(window.location.search, storage);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App initial={initial} storage={storage}/>
  </React.StrictMode>
);
