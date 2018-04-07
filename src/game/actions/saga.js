import {takeEvery, all, put, select} from "redux-saga/effects";
import {Map} from "immutable";

import time from "game/time";
import {endActions} from "definitions/actions";

import {setProgress, end, START} from "./actions";
import {getProgress, getPerSecond, getActionsInProgress} from "./selectors";

export default function* () {
    yield takeEvery(time.TICK, tickProgressSaga);
    yield takeEvery(START, immediateActionSaga);
}

function* immediateActionSaga({payload, meta}) {
    if (meta.immediate) {
        yield put(endActions.get(payload.name));
    }
}

function* tickProgressSaga() {
    const tickInterval = yield select(time.getTickIntervalMs);
    const actions = (yield select(getActionsInProgress)).toJS();
    const currents = yield all(actions.map((name) => select(getProgress, name)));
    const perSeconds = yield all(actions.map((name) => select(getPerSecond, name)));

    const newValues = actions.reduce((acc, item, index) => {
        const delta = perSeconds[index] * (tickInterval / 1000);
        return acc.set(item, delta + currents[index]);
    }, Map());
    const updatedValues = newValues.filter((value) => value <= 1);
    const completedActions = newValues.filter((value) => value > 1).keySeq().toList();

    if (!completedActions.isEmpty()) {
        const actionsToDispatch = completedActions.map((name) => put(endActions.get(name)));
        yield all([
            put(end(completedActions)),
            ...actionsToDispatch,
        ]);
    }

    if (!updatedValues.isEmpty()) {
        yield put(setProgress(updatedValues));
    }
}
