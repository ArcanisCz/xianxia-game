import React from 'react';
import {configure, addDecorator, storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

const req = require.context('../src/components', true, /\.story\.js$/);
const regexp = /\.\/(.*?)\.story\.js/;

function loadStories() {
    req.keys().forEach((filename) => {
        const [Component, props] = req(filename).default;
        const name = regexp.exec(filename)[1];
        storiesOf(name, module).add("Default", () => (
            <Component {...props}/>
        ));
    });
}

addDecorator(withKnobs);

configure(loadStories, module);
