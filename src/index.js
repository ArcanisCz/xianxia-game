import React from 'react';
import {render} from 'react-dom';

import App from './app/App';
import createStore from "./createStore";

const renderApp = (RootComponent) => {
    render(<RootComponent store={createStore()}/>, document.querySelector('#aaa'));
};

renderApp(App);

