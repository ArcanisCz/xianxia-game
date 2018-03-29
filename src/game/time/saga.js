import {delay} from "redux-saga";
import {put, call, take} from "redux-saga/effects";

import {TICK_INTERVAL_MS} from "./constants";
import {tick, START} from "./actions";

export default function* () {
    yield take(START);
    yield call(tickSaga);
}

function* tickSaga() {
    for (;;) {
        yield put(tick());
        yield call(delay, TICK_INTERVAL_MS);
    }
}

