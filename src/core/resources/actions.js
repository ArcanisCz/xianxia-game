import {NAME} from './constants';

export const ADD = `${NAME}/ADD`;

export const add = (resource, amount) => ({
    type: ADD,
    meta: {resource},
    payload: amount,
});
