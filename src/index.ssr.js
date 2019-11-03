import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import {render} from 'react-dom';

import reducer from "./reducer";
import App from './Root';
import createStore from './createStore';
import "./global.css";

const store = createStore(undefined, reducer);

export default () => {
    render(<App store={store} />, document.getElementById('app'));
};
