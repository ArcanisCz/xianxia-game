import {NAME} from './constants';
import saga from './saga';
import {start, TICK, tick} from "./actions";

export default {
    NAME,
    saga,
    start,
    TICK,
    tick,
};
