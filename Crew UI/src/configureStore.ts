import { createStore, applyMiddleware, combineReducers, ReducersMapObject, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { ApplicationState, reducers } from './store';
import { History } from 'history';

export default function configureStore(history: History, initialState?: ApplicationState) {
    const isProduction = process.env.NODE_ENV === 'production';

    const middlewares = [thunk, routerMiddleware(history)];
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer];
    
    const composedEnhancers = isProduction
        ? compose(...enhancers)
        : composeWithDevTools(...enhancers);

    const allReducers = buildRootReducer(reducers);

    const store = createStore(allReducers, initialState as any, composedEnhancers as any);

    // Enable Webpack hot module replacement for reducers ... most of which aren't in the store directory. And are in the same modules as their stores. Balls.
    if (!isProduction && module.hot) {
        module.hot.accept('./store', () => store.replaceReducer(buildRootReducer(reducers)));
    }

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }) as any);
}
