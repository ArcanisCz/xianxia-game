import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducer from "./reducer";

export default (saga, initialActions = []) => {
    let sagaMiddleware = null;
    let middleware = null;

    if (saga) {
        sagaMiddleware = createSagaMiddleware();
        middleware = compose(
            applyMiddleware(thunk),
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : (x) => x,
        );
    } else {
        middleware = compose(
            applyMiddleware(thunk),
        );
    }

    const store = createStore(reducer, middleware);

    if (saga && module.hot) {
        module.hot.accept('./reducer', () =>
            store.replaceReducer(require('./reducer').default)); // eslint-disable-line
    }

    initialActions.forEach(store.dispatch);
    if (saga) {
        sagaMiddleware.run(saga);
    }
    return store;
};
