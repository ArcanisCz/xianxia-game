import {createStore, compose} from 'redux';

import reducer from './app/reducer';

const middleware = compose(
    window.devToolsExtension ? window.devToolsExtension() : (x) => x,
);

export default () => {
    const store = createStore(reducer, middleware);

    if(module.hot) {
        module.hot.accept("./app/reducer", () =>
            store.replaceReducer(require("./app/reducer").default)
        );
    }

    return store;
};
