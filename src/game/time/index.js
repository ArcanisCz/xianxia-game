import {NAME, TICK_INTERVAL_MS} from './constants';
import {tick, TICK} from './actions';

import saga from "./saga";

/**
 * This module handles time, and will emit ticks, which can be listened by other logic.
 */
export default {
    NAME,
    TICK_INTERVAL_MS,
    TICK,
    saga,
    tick,
};
