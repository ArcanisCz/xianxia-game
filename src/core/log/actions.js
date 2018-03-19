import {NAME} from './constants';

export const ADD_MESSAGE = `${NAME}/MESSAGE`;

export const addMessage = (text) => ({
    type: ADD_MESSAGE,
    payload: {date: new Date().getTime(), text},
});
