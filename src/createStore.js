import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from "./reducer";
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (x) => x);

export default () => {
    const store = createStore(reducer, middleware);

    if (module.hot) {
        module.hot.accept('./', () =>
            store.replaceReducer(require('./app/reducers').default)); // eslint-disable-line
    }

    sagaMiddleware.run(saga);
    return store;
};
