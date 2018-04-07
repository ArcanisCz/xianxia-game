import {delay} from "redux-saga";
import {put, call, take, select} from "redux-saga/effects";

import {getTickIntervalMs} from "./selectors";
import {tick, START} from "./actions";

export default function* () {
    yield take(START);
    yield call(tickSaga);
}

function* tickSaga() {
    for (;;) {
        yield put(tick());
        const tickInterval = yield select(getTickIntervalMs);
        yield call(delay, tickInterval);
    }
}

