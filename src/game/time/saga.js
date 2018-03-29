import {delay} from "redux-saga";
import {put, call, fork} from "redux-saga/effects";

import {TICK_INTERVAL_MS} from "./constants";
import {tick} from "./actions";

export default function* () {
    yield fork(tickSaga);
}

function* tickSaga() {
    for (;;) {
        yield put(tick());
        yield call(delay, TICK_INTERVAL_MS);
    }
}

