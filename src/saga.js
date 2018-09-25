import {call, put, fork} from "redux-saga/effects";

import {init} from "./core";
import {time} from "./game";

export default function* () {
    yield fork(time.saga);
    yield call(init.saga, undefined, nonBlockingInit);
}

function* nonBlockingInit() {
    yield put(time.start());
}
