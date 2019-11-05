import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import {renderToString} from 'react-dom/server';

import reducer from "./reducer";
import App from './Root';
import createStore from './createStore';
import "./global.css";

const store = createStore(undefined, reducer);

export default () => renderToString(<App store={store} />);
