import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app';
import {displayKey, DisplayOption, monthKey, yearKey} from "./app/constants";

const storage = window.localStorage;

const today = new Date();
const defaultDisplay = storage.getItem(displayKey) ?? DisplayOption.Year;
const defaultMonth = storage.getItem(monthKey) ?? today.getMonth() + 1;
const defaultYear = storage.getItem(yearKey) ?? today.getFullYear();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App defaultDisplay={defaultDisplay}
         defaultYear={defaultYear}
         defaultMonth={defaultMonth}
    />
  </React.StrictMode>
);
