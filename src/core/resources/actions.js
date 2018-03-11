import {NAME} from './constants';

export const ADD = `${NAME}/ADD`;
export const SET_BULK = `${NAME}/BULK`;

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
export const setBulk = (amountMap) => ({
    type: SET_BULK,
    payload: amountMap,
});
