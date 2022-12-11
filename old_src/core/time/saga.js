import {take, delay, put} from 'redux-saga/effects';

import {START, tick} from './actions';

const TICK_MS = 1000;

export default function* () {
    yield take(START);
    while (true) {
        yield put(tick(TICK_MS));
        yield delay(TICK_MS);
    }
}
