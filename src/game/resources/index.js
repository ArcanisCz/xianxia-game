import {NAME, QI, KARMA} from './constants';
import {add} from './actions';
import {getCurrent, getMax, isFull, getPerSecond, getVisibleResources} from './selectors';
import reducer from './reducer';
import saga from "./saga";

/**
 * This module is storing info about resources, and handles all actions for them
 */
export default {
    NAME,
    reducer,
    saga,
    QI,
    KARMA,
    getCurrent,
    getMax,
    getPerSecond,
    getVisibleResources,
    isFull,
    add,
};
