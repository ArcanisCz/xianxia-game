import {NAME} from './constants';

export const START_ACTION = `${NAME}/START_ACTION`;
export const SET_PROGRESS = `${NAME}/SET_PROGRESS`;
export const END_ACTION = `${NAME}/END_ACTION`;

/**
 * @param {string} name
 */
export const startAction = (name, immediate = false) => ({
    type: START_ACTION,
    meta: {immediate},
    payload: {name},
});

/**
 * @param {Map<string, number>} progressMap
 */
export const setProgress = (progressMap) => ({
    type: SET_PROGRESS,
    payload: {progressMap},
});

/**
 * @param {List<string>} namesList
 */
export const endAction = (namesList) => ({
    type: END_ACTION,
    payload: {namesList},
});
