import React from 'react';
import {hot} from 'react-hot-loader';
import injectSheet from 'react-jss';
import {connect} from "react-redux";

import {AppLayout} from "components";
import init from "core/init";

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

const App = ({loading}) => (
    <AppLayout
        loading={loading}
        sidebar={<sidebar.Container />}
        content={<buttons.Container />}
        log={<log.Container />}
    />
);

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
});

const Connected = connect(mapStateToProps)(App);
const Styled = injectSheet(styles)(Connected);
const Hot = hot(module)(Styled);

export default Hot;

