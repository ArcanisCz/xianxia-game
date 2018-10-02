import "@babel/polyfill"; // Cannot be in webpack, where it imports whole polyfill. needs to be here

import React from 'react';
import {render} from 'react-dom';

import i18n from "core/i18n";

import saga from './saga';
import App from './Root';
import createStore from './createStore';
import messages from "../data/en.yml";

/* eslint-disable no-undef,no-console */
console.log(`%cversion: %c${VERSION.VERSION}`, "font-weight: normal", "font-weight: bold");
console.log(`%ccommit: %c${VERSION.HASH}`, "font-weight: normal", "font-weight: bold");
console.log(`%cdate: %c${new Date(VERSION.DATE).toISOString()}`, "font-weight: normal", "font-weight: bold");
/* eslint-enable */

const store = createStore(saga, [
    i18n.loadMessages(messages),
]);

const renderApp = (RootComponent) => {
    render(<RootComponent store={store} />, document.querySelector('#app'));
};

renderApp(App);
