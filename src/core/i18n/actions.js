import {NAME} from './constants';

export const MESSAGES_LOAD = `${NAME}/MESSAGES_LOAD`;

export const loadMessages = (messages) => ({
    type: MESSAGES_LOAD,
    payload: messages,
});
