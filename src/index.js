import React from 'react';
import {render} from 'react-dom';

import App from './Root';
import createStore from './createStore';

const store = createStore();

const renderApp = (RootComponent) => {
    render(<RootComponent store={store} />, document.querySelector('#aaa'));
};

renderApp(App);
