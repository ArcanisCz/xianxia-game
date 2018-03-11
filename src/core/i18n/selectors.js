import {createStructuredSelector} from "reselect";

import {NAME} from './constants';

const getModel = (state) => state.get(NAME);

/**
 * Returns message and optionally formats it.
 * @param key Message key
 * @returns {String} Formatted string
 */
export const getMessage = (state, key) => {
    const message = getModel(state).getIn(["messages", key]);
    if (message) {
        return message;
    } else {
        return `[${key}]`; // fallback
    }
};

/**
 * Creates memoized selector for messages.
 * @param {Object} messages pairs (name, key)
 */
export const createGetMessages = (messages) => {
    const map = {};

    Object.keys(messages).forEach((key) => {
        map[key] = (state) => getMessage(state, messages[key]);
    });
    return createStructuredSelector(map);
};
