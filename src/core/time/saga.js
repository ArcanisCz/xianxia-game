import {take, delay, put} from 'redux-saga/effects';

import {START, tick} from './actions';

export default function* () {
    yield take(START);
    while (true) {
        yield put(tick());
        yield delay(1000); // TODO
    }
}
