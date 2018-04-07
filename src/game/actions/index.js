import {NAME} from './constants';
import {startAction} from './actions';
import {getProgress, canStart, getPerSecond} from './selectors';
import reducer from './reducer';
import saga from "./saga";

/**
 * This module is storing info about resources, and handles all actions for them
 */
export default {
    NAME,
    reducer,
    saga,
    startAction,
    getProgress,
    canStart,
    getPerSecond,
};
