import {NAME} from './constants';
import {getMessage, createGetMessages} from './selectors';
import reducer from './reducer';
import {loadMessages} from './actions';

/**
 * INTERNATIONALIZATION MODULE
 *
 * Stores messages and exposes them via selector.
 * Also, stores date formats.
 *
 * There is no support for switching yet, but it should be quite simple to add.
 *
 */
const translate = {
    NAME,
    getMessage,
    createGetMessages,
    loadMessages,
    reducer,
};
export default translate;
