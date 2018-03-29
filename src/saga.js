import {all, fork, call} from "redux-saga/effects";

import gameSagas from "./game/sagas";
import init from "./core/init";


export default function* () {
    yield all(gameSagas.map(fork));
    yield call(init.saga);
}
