import {action, boolean} from 'story/util';

import {Button} from '../Button';

export default {
    Neco: [Button, () => ({
        onClick: action('clicked'),
        text: "Neco",
        disabled: boolean("Disabled", false),
        block: boolean("Block", false),
    })],
    Neco1: [Button, () => ({
        onClick: action('clicked'),
        text: "Neco1",
        disabled: boolean("Disabled", false),
        block: boolean("Block", false),
    })],
};
