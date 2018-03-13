import React from 'react';
import {hot} from 'react-hot-loader';
import injectSheet from 'react-jss';

import resources from "core/resources";

import {Resource} from "./Resource";

const styles = (theme) => ({
    "@global": {
        html: {
            margin: 0,
            padding: 0,
            fontFamily: theme.font.family,
        },
        body: {
            margin: 0,
            padding: 0,
        },
    },
});

const App = () => (
    <div>
        <Resource resource={resources.QI} />
    </div>
);

export default hot(module)(injectSheet(styles)(App));

