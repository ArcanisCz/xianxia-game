import React from 'react';
import {render} from 'react-dom';

import i18n from "core/i18n";

import App from './Root';
import createStore from './createStore';
import messages from "../data/en.yml";

const store = createStore([
    i18n.loadMessages(messages),
]);

const renderApp = (RootComponent) => {
    render(<RootComponent store={store} />, document.querySelector('#app'));
};

renderApp(App);
