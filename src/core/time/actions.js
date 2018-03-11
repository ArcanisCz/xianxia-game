import {NAME} from './constants';

export const TICK = `${NAME}/TICK`;

export const tick = () => ({
    type: TICK,
});
