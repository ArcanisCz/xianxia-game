import {NAME} from './constants';

export const START = `${NAME}/START`;
export const SET_PROGRESS = `${NAME}/SET_PROGRESS`;
export const END = `${NAME}/END`;
export const LEVEL_UP = `${NAME}/LEVEL_UP`;

/**
 * @param {string} name
 * @param {boolean} immediate
 */
export const start = (name, immediate = false) => ({
    type: START,
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
export const end = (namesList) => ({
    type: END,
    payload: {namesList},
});

export const levelUp = (name) => ({
    type: LEVEL_UP,
    payload: {name},
});
