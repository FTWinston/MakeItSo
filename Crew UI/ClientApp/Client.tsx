import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import ScreenManager from './components/ScreenManager';
import { Connection } from './functionality/Connection';
import { Hotkeys } from './functionality/Hotkeys';
import './Client.scss';

const history = createBrowserHistory();

export const store = configureStore(history);

export const connection = new Connection('ws://' + location.host + '/ws');

Hotkeys.initialize();

function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <Provider store={ store }>
                <ScreenManager />
            </Provider>
        </AppContainer>,
        document.getElementById('client-root')
    );
}

renderApp();