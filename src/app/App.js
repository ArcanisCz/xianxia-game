import React from 'react';
import {hot} from 'react-hot-loader';
import injectSheet from 'react-jss';

import {AppLayout, Button} from "components";
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

const noop = () => {}; // TODO

const App = () => (
    <AppLayout
        title={(
            <Button text="Pokus" onClick={noop} block />
        )}
        sidebar={(
            <Resource resource={resources.QI} />
        )}
        content={(
            <div>
                <Button text="Pokus" onClick={noop} /> &nbsp;
                <Button text="Pokus" onClick={noop} disabled /> &nbsp;
                <Button text="Pokus" onClick={noop} progress={0.1} /> &nbsp;
                <Button text="Pokus" onClick={noop} disabled progress={0.2} /> &nbsp;
            </div>
        )}
    />
);

export default hot(module)(injectSheet(styles)(App));

