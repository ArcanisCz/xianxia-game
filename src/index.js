import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import {render} from 'react-dom';

import saga from './saga';
import reducer from "./reducer";
import App from './Root';
import createStore from './createStore';
import "./global.scss";

const store = createStore(saga, reducer);

render(<App store={store} />, document.getElementById('app'));
