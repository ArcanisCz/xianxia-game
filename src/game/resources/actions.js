import {NAME} from './constants';

export const ADD = `${NAME}/ADD`;
export const SET = `${NAME}/SET`;

/**
 * @param {String} resource
 * @param {Number} amount
 */
export const add = (resource, amount) => ({
    type: ADD,
    meta: {resource},
    payload: amount,
});

/**
 * @param {Map<String, Number>} amountMap
 */
export const set = (amountMap) => ({
    type: SET,
    payload: amountMap,
});
