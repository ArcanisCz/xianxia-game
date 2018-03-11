import {all, fork} from "redux-saga/effects";

import coreSagas from "./core/sagas";


export default function* () {
    yield all(coreSagas.map(fork));
}
