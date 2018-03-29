import {NAME, MEDITATE} from './constants';
import {startAction} from './actions';
import {getProgress, canStart} from './selectors';
import reducer from './reducer';
import saga from "./saga";

/**
 * This module is storing info about resources, and handles all actions for them
 */
export default {
    NAME,
    reducer,
    saga,
    MEDITATE,
    startAction,
    getProgress,
    canStart,
};
