import {NAME, QI} from './constants';
import {add} from './actions';
import {getCurrent, getMax, isFull} from './selectors';
import reducer from './reducer';
import saga from "./saga";

export default {
    NAME,
    reducer,
    saga,
    QI,
    getCurrent,
    getMax,
    isFull,
    add,
};
