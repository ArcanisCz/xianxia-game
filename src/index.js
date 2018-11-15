import "@babel/polyfill"; // Cannot be in webpack, where it imports whole polyfill. needs to be here

import React from 'react';
import {render} from 'react-dom';

import i18n from "core/i18n";

import saga from './saga';
import App from './Root';
import createStore from './createStore';
import messages from "../data/en.yml";
import "./global.scss";

const store = createStore(saga, [
    i18n.loadMessages(messages),
]);

const renderApp = (RootComponent) => {
    render(<RootComponent store={store} />, document.querySelector('#app'));
};

renderApp(App);
