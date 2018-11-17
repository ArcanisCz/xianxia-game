import {action, boolean, text} from 'story/util';

import {Button} from './Button';

export default [Button, {
    onClick: action('clicked'),
    text: text("Text", "Button"),
    disabled: boolean("Disabled", false),
    block: boolean("Block", false),
}];
