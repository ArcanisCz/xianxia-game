import React from 'react';

import {storiesOf, action, boolean, text} from 'story/util';

import {Button} from './Button';

storiesOf('Button', module)
    .add('Default', () => (
        <Button
            onClick={action('clicked')}
            text={text("Text", "Button")}
            disabled={boolean("Disabled", false)}
            block={boolean("Block", false)}
        />
    ));
