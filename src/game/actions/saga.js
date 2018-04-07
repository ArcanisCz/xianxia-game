import {takeEvery, all, put, select} from "redux-saga/effects";
import {Map} from "immutable";

import time from "game/time";
import resources from "game/resources";
import log from "core/log";

import {MEDITATE} from "./constants";
import {setProgressBulk, endActionBulk} from "./actions";
import {getProgress, getPerSecond, getInProgress} from "./selectors";

export default function* () {
    yield takeEvery(time.TICK, tickResourceSaga);
}

const endActions = Map({
    [MEDITATE]: resources.add(resources.QI, 200),
});

function* tickResourceSaga() {
    const actions = (yield select(getInProgress)).toJS();
    const currents = yield all(actions.map((name) => select(getProgress, name)));
    const perSeconds = yield all(actions.map((name) => select(getPerSecond, name)));
    const tickInterval = yield select(time.getTickIntervalMs);

    const newValues = actions.reduce((acc, item, index) => {
        const delta = perSeconds[index] * (tickInterval / 1000);
        return acc.set(item, delta + currents[index]);
    }, Map());
    const updatedValues = newValues.filter((value) => value <= 1);
    const completedActions = newValues.filter((value) => value > 1).keySeq().toList();

    if (!completedActions.isEmpty()) {
        const actionsToDispatch = completedActions.map((name) => put(endActions.get(name)));
        yield all([
            put(endActionBulk(completedActions)),
            ...actionsToDispatch,
            put(log.addMessage(`Completed: ${JSON.stringify(completedActions)}`)),
        ]);
    }

    if (!updatedValues.isEmpty()) {
        yield put(setProgressBulk(updatedValues));
    }
}
