import React from 'react';
import {configure, addDecorator, storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

const FILENAME_REGEXP = /\..*\/(.*?)\.story\.js/;

const atomsContext = require.context('../src/components/atoms', true, /\.story\.js$/);
const atomsStories = storiesOf("Atoms", module);

const moleculesContext = require.context('../src/components/molecules', true, /\.story\.js$/);
const moleculesStories = storiesOf("Molecules", module);

const organismsContext = require.context('../src/components/organisms', true, /\.story\.js$/);
const organismsStories = storiesOf("Organisms", module);

const templatesContext = require.context('../src/components/templates', true, /\.story\.js$/);
const templatesStories = storiesOf("Templates", module);

const pagesContext = require.context('../src/components/pages', true, /\.story\.js$/);
const pagesStories = storiesOf("Pages", module);

addDecorator(withKnobs);
configure(() => {
    addStories(atomsContext, atomsStories);
    addStories(moleculesContext, moleculesStories);
    addStories(organismsContext, organismsStories);
    addStories(templatesContext, templatesStories);
    addStories(pagesContext, pagesStories);
}, module);

function addStories(context, stories) {
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
