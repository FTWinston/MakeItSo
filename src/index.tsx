import React from 'react';
import ReactDOM from 'react-dom';
import './common/index.scss';
import { App } from './App';
import { Theme } from './common/theme';

ReactDOM.render(
    <React.StrictMode>
        <Theme>
            <App />
        </Theme>
    </React.StrictMode>,
    document.getElementById('root')
);
