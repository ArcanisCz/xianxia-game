import {NAME} from './constants';

export const TICK = `${NAME}/TICK`;
export const START = `${NAME}/START`;

export const tick = () => ({
    type: TICK,
});

export const start = () => ({
    type: START,
});
