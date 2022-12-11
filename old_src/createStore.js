import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

export default (saga = null, rootReducer, initialActions = []) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    if (saga) {
        const sagaMiddleware = createSagaMiddleware();
        const middleware = composeEnhancers(
            applyMiddleware(sagaMiddleware),
        );
        const store = createStore(rootReducer, middleware);

        initialActions.forEach(store.dispatch);
        sagaMiddleware.run(saga);
        return store;
    }

    const middleware = composeEnhancers();
    const store = createStore(rootReducer, middleware);
    initialActions.forEach(store.dispatch);
    return store;
};
