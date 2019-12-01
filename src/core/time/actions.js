import {NAME} from './constants';

export const START = `${NAME}/START`;
export const TICK = `${NAME}/TICK`;

export const start = () => ({
    type: START,
});

export const tick = () => ({
    type: TICK,
});

