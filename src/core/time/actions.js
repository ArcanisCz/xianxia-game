import {NAME} from './constants';

export const START = `${NAME}/START`;
export const STOP = `${NAME}/STOP`;

export const start = () => ({
    type: START,
});

export const stop = () => ({
    type: STOP,
});
