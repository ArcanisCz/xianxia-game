import React from 'react';
import {hot} from 'react-hot-loader';

import resources from "core/resources";

import {Resource} from "./Resource";

const App = () => (
    <div>
        <Resource resource={resources.QI} />
    </div>
);

export default hot(module)(App);

