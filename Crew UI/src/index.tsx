import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import ScreenManager from './components/ScreenManager';
import { Connection, Hotkeys } from './functionality';
import './index.scss';

const history = createBrowserHistory();

export const store = configureStore(history);

const rootElement = document.getElementById('client-root')!;

let serverRoot = rootElement.getAttribute('data-gameServer')!;
if (serverRoot.length === 0) {
    serverRoot = location.host;
}

export const connection = new Connection(`ws://${serverRoot}/ws`);

Hotkeys.initialize();


function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <Provider store={ store }>
                <ScreenManager />
            </Provider>
        </AppContainer>,
        rootElement
    );
}

renderApp();