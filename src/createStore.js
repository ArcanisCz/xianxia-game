import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

export default (saga, rootReducer, initialActions = []) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();

    const middleware = composeEnhancers(
        applyMiddleware(sagaMiddleware),
    );
    const store = createStore(rootReducer, middleware);

    initialActions.forEach(store.dispatch);
    sagaMiddleware.run(saga);
    return store;
};
