import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import ScreenSelector from './components/ScreenSelector';
import { Hotkeys } from './functionality/Hotkeys';
import './Client.scss';

const history = createBrowserHistory();

export const store = configureStore(history);

Hotkeys.initialize();

function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <Provider store={ store }>
                <ScreenSelector />
            </Provider>
        </AppContainer>,
        document.getElementById('client-root')
    );
}

renderApp();