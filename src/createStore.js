import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducer from "./reducer";
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (x) => x,
);

export default (initialActions = []) => {
    const store = createStore(reducer, middleware);

    if (module.hot) {
        module.hot.accept('./', () =>
            store.replaceReducer(require('./reducer').default)); // eslint-disable-line
    }

    initialActions.forEach(store.dispatch);
    sagaMiddleware.run(saga);
    return store;
};
