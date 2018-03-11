import {NAME, QI} from './constants';
import {add} from './actions';
import {getCurrent, getMax, isFull, getPerSecond} from './selectors';
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
    getCurrent,
    getMax,
    getPerSecond,
    isFull,
    add,
};
