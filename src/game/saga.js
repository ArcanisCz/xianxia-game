import {put, fork, select, all, call} from "redux-saga/effects";

import {time} from "core";

import {RESOURCES} from "./constants";
import {addResourceInternal} from "./actions";
import {getRealResourcePerSecond, getResourceMax} from "./selectors";

export default function* () {
    yield fork(time.saga, gameTick);

    yield put(time.start());
}

function* gameTick() {
    yield call(addResouces);
}

function* addResouces() {
    const values = yield all(RESOURCES.map((resource) => select(getRealResourcePerSecond, resource)));
    const maxs = yield all(RESOURCES.map((resource) => select(getResourceMax, resource)));
    const actions = values.reduce((acc, toAdd, index) => {
        if (toAdd !== 0) {
            return [...acc, put(addResourceInternal(RESOURCES[index], toAdd, maxs[index]))];
        }
        return acc;
    }, []);
    yield all(actions);
}
