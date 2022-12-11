import {NAME} from './constants';

export const SET_INITIALIZED = `${NAME}/SET_INITIALIZED`;

export const setInitialized = () => ({
    type: SET_INITIALIZED,
});
