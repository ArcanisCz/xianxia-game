import {takeEvery, all, put, select} from "redux-saga/effects";
import {Map} from "immutable";

import time from "core/time";
import resources from "core/resources";

import {MEDITATE} from "./constants";
import {setProgressBulk, endActionBulk} from "./actions";
import {getProgress, getPerSecond, getInProgress} from "./selectors";

export default function* () {
    yield takeEvery(time.TICK, tickResourceSaga);
}

const endActions = Map({
    [MEDITATE]: resources.add(resources.QI, 1),
});

function* tickResourceSaga() {
    const actions = (yield select(getInProgress)).toJS();
    const currents = yield all(actions.map((name) => select(getProgress, name)));
    const perSeconds = yield all(actions.map((name) => select(getPerSecond, name)));

    const newValues = actions.reduce((acc, item, index) => {
        const delta = perSeconds[index] * (time.TICK_INTERVAL_MS / 1000);
        return acc.set(item, delta + currents[index]);
    }, Map());
    const updatedValues = newValues.filter((value) => value <= 1);
    const completedActions = newValues.filter((value) => value > 1).keySeq().toList();

    if (!completedActions.isEmpty()) {
        yield put(endActionBulk(completedActions));
        const aaa = completedActions.map((name) => put(endActions.get(name)));
        yield all([...aaa]);
    }

    if (!updatedValues.isEmpty()) {
        yield put(setProgressBulk(updatedValues));
    }
}
