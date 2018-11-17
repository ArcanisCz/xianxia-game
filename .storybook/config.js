import {configure, addDecorator, setAddon} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

function loadStories() {
    require('../src/story');
}

addDecorator(withKnobs);

configure(loadStories, module);
