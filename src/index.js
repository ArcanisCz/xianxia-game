import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import {hydrate} from 'react-dom';

import saga from './saga';
import reducer from "./reducer";
import App from './Root';
import createStore from './createStore';
import "./global.css";

const store = createStore(saga, reducer);

hydrate(<App store={store} />, document.getElementById('app'));
