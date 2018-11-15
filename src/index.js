import "@babel/polyfill"; // Cannot be in webpack, where it imports whole polyfill. needs to be here
import {h, render} from 'preact';

import i18n from "core/i18n";

import saga from './saga';
import App from './Root';
import createStore from './createStore';
import messages from "../data/en.yml";

/* eslint-disable */
if (process.env.NODE_ENV === "development") {
    require("./util/preactPropTypes");
}
/* eslint-enable */

const store = createStore(saga, [
    i18n.loadMessages(messages),
]);

const renderApp = (RootComponent) => {
    render(<RootComponent store={store} />, document.querySelector('#app'));
};

renderApp(App);
