import {NAME} from './constants';

export const MEDITATE = `${NAME}/MEDITATE`;

export const TECHNIQUE_LEVEL_UP = `${NAME}/TECHNIQUE_LEVEL_UP`;

export const meditate = () => ({
    type: MEDITATE,
});

export const techniqueLevelUp = (technique) => ({
    type: TECHNIQUE_LEVEL_UP,
    payload: {technique},
});
