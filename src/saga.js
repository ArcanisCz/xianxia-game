import {all, fork, call} from "redux-saga/effects";

import coreSagas from "./game/sagas";
import init from "./core/init";


export default function* () {
    yield call(init.saga);
    yield all(coreSagas.map(fork));
}
