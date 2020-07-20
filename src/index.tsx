import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import { Theme } from './style/theme';

ReactDOM.render(
    <React.StrictMode>
        <Theme>
            <App />
        </Theme>
    </React.StrictMode>,
    document.getElementById('root')
);
