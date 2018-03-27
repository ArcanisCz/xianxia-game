import {all, fork, call} from "redux-saga/effects";

import coreSagas from "./core/sagas";
import init from "./core/init";


export default function* () {
    yield call(init.saga);
    console.log("initialized");
    yield all(coreSagas.map(fork));
}
