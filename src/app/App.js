import React from 'react';
import {hot} from 'react-hot-loader';

import {Resource} from "containers";
import resources from "core/resources";

const App = () => (
    <div>
        <Resource resource={resources.QI} />
    </div>
);

export default hot(module)(App);

