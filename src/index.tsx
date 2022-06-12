import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from './engine/store/store';
import './style/style.css'
import { BrowserRouter, Router } from 'react-router-dom';
import history from "./engine/helpers/history";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
