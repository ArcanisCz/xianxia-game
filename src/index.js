import "@babel/polyfill"; // Cannot be in webpack, where it imports whole polyfill. needs to be here

import {h, render} from 'preact';

import i18n from "core/i18n";

import App from './Root';
import createStore from './createStore';
import messages from "../data/en.yml";
import theme from "./theme";

const store = createStore([
    i18n.loadMessages(messages),
]);

const renderApp = (RootComponent) => {
    render(<RootComponent store={store} theme={theme} />, document.querySelector('#app'));
};

renderApp(App);

