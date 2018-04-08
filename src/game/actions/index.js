import {NAME} from './constants';
import {start, levelUp} from './actions';
import {getProgress, canStart, getPerSecond, getLevel, canLevelUp} from './selectors';
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
    levelUp,
    getProgress,
    canStart,
    getPerSecond,
    getLevel,
    canLevelUp,
};
