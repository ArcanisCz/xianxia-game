import {put, fork} from "redux-saga/effects";

import {time} from "core";

import {performResourcesPerSecond} from "./actions";

export default function* () {
    yield fork(time.saga, gameTick);

    yield put(time.start());
}

function* gameTick() {
    yield put(performResourcesPerSecond());
}
