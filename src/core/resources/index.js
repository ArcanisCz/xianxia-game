import {NAME, QI} from './constants';
import {add} from './actions';
import {getCurrent, getMax, isFull} from './selectors';
import reducer from './reducer';

export default {
    NAME,
    reducer,
    QI,
    getCurrent,
    getMax,
    isFull,
    add,
};
