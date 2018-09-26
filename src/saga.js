import {call} from "redux-saga/effects";

import {init} from "./core";

export default function* () {
    yield call(init.saga);
}
