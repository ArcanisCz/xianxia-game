import React from 'react';
import {hot} from 'react-hot-loader';
import injectSheet from 'react-jss';

import {AppLayout} from "components";

import sidebar from "./sidebar";
import buttons from "./buttons";
import log from "./log";

const styles = (theme) => ({
    "@global": {
        html: {
            fontFamily: theme.font.family,
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
        },
        body: {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
        },
        "#app": {
            width: "100%",
            height: "100%",
        },
    },
});

const App = () => (
    <AppLayout
        sidebar={<sidebar.Container />}
        content={<buttons.Container />}
        log={<log.Container />}
    />
);

export default hot(module)(injectSheet(styles)(App));

