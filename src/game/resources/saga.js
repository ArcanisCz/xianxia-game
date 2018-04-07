import {takeEvery, all, put, select} from "redux-saga/effects";
import {Map} from "immutable";

import time from "game/time";

import {ADD, setBulk} from "./actions";
import {getMax, getCurrent, getResourcesList, getPerSecond} from "./selectors";

export default function* () {
    yield takeEvery(ADD, addResourceSaga);
    yield takeEvery(time.TICK, tickResourceSaga);
}

function* addResourceSaga({payload, meta}) {
    const [current, max] = yield all([
        select(getCurrent, meta.resource),
        select(getMax, meta.resource),
    ]);
    const newAmount = Math.min(current + payload, max);
    yield put(setBulk(Map({[meta.resource]: newAmount})));
}

function* tickResourceSaga() {
    const resources = (yield select(getResourcesList)).toJS();

    const currents = yield all(resources.map((name) => select(getCurrent, name)));
    const perSeconds = yield all(resources.map((name) => select(getPerSecond, name)));
    const maxs = yield all(resources.map((name) => select(getMax, name)));
    const tickInterval = yield select(time.getTickIntervalMs);

    const newValues = resources.reduce((acc, item, index) => {
        const delta = perSeconds[index] * (tickInterval / 1000);
        if (currents[index] >= maxs[index] || delta === 0) {
            return acc;
        }
        return acc.set(item, Math.min(delta + currents[index], maxs[index]));
    }, Map());

    if (!newValues.isEmpty()) {
        yield put(setBulk(newValues));
    }
}
