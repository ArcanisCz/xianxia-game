import {take, delay, call} from 'redux-saga/effects';

import {START} from './actions';

export default function* (tickSaga) {
    yield take(START);
    while (true) {
        yield call(tickSaga);
        yield delay(1000); // TODO
    }
}
