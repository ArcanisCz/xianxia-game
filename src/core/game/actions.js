import {NAME} from './constants';

export const TECHNIQUE_LEVEL_UP = `${NAME}/TECHNIQUE_LEVEL_UP`;
export const ACTIVATE_ACTIVITY = `${NAME}/ACTIVATE_ACTIVITY`;

export const techniqueLevelUp = (technique) => ({
    type: TECHNIQUE_LEVEL_UP,
    payload: {technique},
});

export const activateActivity = (activity) => ({
    type: ACTIVATE_ACTIVITY,
    payload: {activity},
});
