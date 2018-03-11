import {NAME} from './constants';

export const ADD = `${NAME}/ADD`;
export const SET = `${NAME}/SET`;

export const add = (resource, amount) => ({
    type: ADD,
    meta: {resource},
    payload: amount,
});

export const set = (resource, amount) => ({
    type: SET,
    meta: {resource},
    payload: amount,
});
