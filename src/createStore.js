import {createStore, compose} from 'redux';

import reducer from "./reducer";

const middleware = compose(window.devToolsExtension ? window.devToolsExtension() : (x) => x);

export default () => {
    const store = createStore(reducer, middleware);

    if (module.hot) {
        module.hot.accept('./', () =>
            store.replaceReducer(require('./app/reducers').default)); // eslint-disable-line
    }

    return store;
};
