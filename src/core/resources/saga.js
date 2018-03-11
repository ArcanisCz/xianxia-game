import {takeEvery, all, put, select} from "redux-saga/effects";

import {ADD, set} from "./actions";
import {getMax, getCurrent} from "./selectors";

export default function* () {
    yield takeEvery(ADD, addResourceSaga);
}

function* addResourceSaga({payload, meta}) {
    const [current, max] = yield all([
        select(getCurrent, meta.resource),
        select(getMax, meta.resource),
    ]);
    const newAmount = Math.min(current + payload, max);
    yield put(set(meta.resource, newAmount));
}
