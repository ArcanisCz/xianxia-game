import {call} from "redux-saga/effects";

import {init} from "./core";
import game from "./game";

export default function* () {
    yield call(init.saga);
    yield call(game.saga);
}
