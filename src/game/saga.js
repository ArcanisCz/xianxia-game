import {put, fork} from "redux-saga/effects";

import {time} from "core";

export default function* () {
    yield fork(time.saga, gameTick);

    yield put(time.start());
}

function* gameTick() {
    // yield call(addResouces);
}
