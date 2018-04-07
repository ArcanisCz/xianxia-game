import {NAME} from './constants';
import {start, TICK} from './actions';
import {getTickIntervalMs} from './selectors';

import saga from "./saga";

/**
 * This module handles time, and will emit ticks, which can be listened by other logic.
 */
export default {
    NAME,
    getTickIntervalMs,
    TICK,
    saga,
    start,
};
