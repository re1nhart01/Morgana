import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReduxHOC } from "./hoc/reduxHOC";
import {BrowserRouter} from "react-router-dom";
import './styles/main.scss'
require("./bll/GlobalLogic")
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




root.render(
    <BrowserRouter>
      <React.StrictMode>
        {ReduxHOC(<App />)}
      </React.StrictMode>
    </BrowserRouter>
);

