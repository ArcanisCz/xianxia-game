import {NAME} from './constants';
import {addMessage} from './actions';
import {getMessages} from './selectors';
import reducer from './reducer';

/**
 * This module is storing info about resources, and handles all actions for them
 */
export default {
    NAME,
    reducer,
    addMessage,
    getMessages,
};
