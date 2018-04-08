import {NAME} from './constants';
import {add, subtract} from './actions';
import {getCurrent, getMax, isFull, getPerSecond, getMainResources, getSecondaryResources} from './selectors';
import reducer from './reducer';
import saga from "./saga";

/**
 * This module is storing info about resources, and handles all actions for them
 */
export default {
    NAME,
    reducer,
    saga,
    getCurrent,
    getMax,
    getPerSecond,
    getMainResources,
    getSecondaryResources,
    isFull,
    add,
    subtract,
};
