import {NAME} from './constants';

export const START_ACTION = `${NAME}/START_ACTION`;
export const SET_PROGRESS_BULK = `${NAME}/SET_PROGRESS_BULK`;
export const END_ACTION_BULK = `${NAME}/END_ACTION_BULK`;

export const startAction = (name) => ({
    type: START_ACTION,
    payload: {name},
});

export const setProgressBulk = (progressMap) => ({
    type: SET_PROGRESS_BULK,
    payload: progressMap,
});


export const endActionBulk = (actionList) => ({
    type: END_ACTION_BULK,
    payload: actionList,
});
