import React from 'react';
import {hot} from 'react-hot-loader';
import injectSheet from 'react-jss';

import {AppLayout} from "components";
import resources from "core/resources";

import {Resource} from "./Resource";

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
        title="Title"
        sidebar={<Resource resource={resources.QI} />}
        content="Content"
    />
);

export default hot(module)(injectSheet(styles)(App));

