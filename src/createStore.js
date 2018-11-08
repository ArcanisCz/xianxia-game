import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from "./reducer";

export default (saga, initialActions = []) => {
    let sagaMiddleware = null;
    let middleware;

    if (saga) {
        sagaMiddleware = createSagaMiddleware();
        middleware = compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : (x) => x,
        );
    }

    const store = createStore(reducer, middleware);

    initialActions.forEach(store.dispatch);
    if (saga) {
        sagaMiddleware.run(saga);
    }
    return store;
};
