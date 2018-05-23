import {delay} from "redux-saga";
import {put, call, take, select} from "redux-saga/effects";

import {getTickIntervalMs} from "./selectors";
import {tick, START} from "./actions";

export default function* () {
    const obj = {
        foo: {
            bar: {
                baz: 42,
            },
        },
    };
    const baz = obj?.foo?.bar?.baz; // 42
    // eslint-disable-next-line
    console.log(baz);


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

