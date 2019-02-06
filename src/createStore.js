import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from "./reducer";

export default (saga, initialActions = []) => {
    let sagaMiddleware = null;
    let middleware;

    if (saga) {
        sagaMiddleware = createSagaMiddleware();
        /* eslint-disable no-underscore-dangle */
        middleware = compose(
            applyMiddleware(sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (x) => x,
        );
        /* eslint-enable */
    }

    const store = createStore(reducer, middleware);

    initialActions.forEach(store.dispatch);
    if (saga) {
        sagaMiddleware.run(saga);
    }
    return store;
};
