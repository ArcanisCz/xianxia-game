import React from 'react';
import {configure, addDecorator, storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

const FILENAME_REGEXP = /\..*\/(.*?)\.story\.js/;
const context = require.context('../src/components', true, /\.story\.js$/);
const stories = storiesOf("Components", module);

addDecorator(withKnobs);
configure(loadStories, module);

function loadStories() {
    context.keys().forEach((filename) => {
        const story = context(filename).default;
        const name = FILENAME_REGEXP.exec(filename)[1];
        if(Array.isArray(story)){
            addStory(stories, story, name);
        } else {
            Object.keys(story).forEach((subName) => {
                addStory(stories, story[subName], `${name}/${subName}`);
            })
        }
    });
}

function addStory(stories, story, name) {
    const [Component, createProps] = story;
    stories.add(name, () => (
        <Component {...createProps()}/>
    ));
}
