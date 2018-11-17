import {configure, addDecorator} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';

function loadStories() {
    require('../src/story');
}

addDecorator(checkA11y);
addDecorator(withKnobs);

configure(loadStories, module);
