import {NAME} from './constants';
import {start} from './actions';
import {getProgress, canStart, getPerSecond, getLevel} from './selectors';
import reducer from './reducer';
import saga from "./saga";

/**
 * This module is storing info about resources, and handles all actions for them
 */
export default {
    NAME,
    reducer,
    saga,
    start,
    getProgress,
    canStart,
    getPerSecond,
    getLevel,
};
