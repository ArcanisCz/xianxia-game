import {delay} from "redux-saga";
import {takeEvery, all, put, select, call} from "redux-saga/effects";
import {List} from "immutable";

import {endActions, levelUpPriceMap} from "definitions/actions";
import resources from "game/resources";

import {end, START, LEVEL_UP} from "./actions";
import {getPerSecond} from "./selectors";

export default function* () {
    yield takeEvery(START, startActionSaga);
    yield takeEvery(LEVEL_UP, levelUpSaga);
}

function* startActionSaga({payload, meta}) {
    if (meta.immediate) {
        yield put(endActions.get(payload.name));
    } else {
        const perSecond = yield select(getPerSecond, payload.name);
        yield call(delay, (1 / perSecond) * 1000);
        yield all([
            put(endActions.get(payload.name)),
            put(end(List([payload.name]))),
        ]);
    }
}

function* levelUpSaga({payload}) {
    const prices = yield select(levelUpPriceMap.get(payload.name));
    const actions = prices.map((price, resourceName) => put(resources.subtract(resourceName, price)));
    yield all(actions.toJS());
}
