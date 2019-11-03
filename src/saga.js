import {call, delay} from "redux-saga/effects";

import {translationApi} from "./api";
import {init, i18n} from "./core";
import game from "./game";

export default function* () {
    yield call(init.saga, blocking);
    yield call(game.saga);
}

function* blocking() {
    const messages = yield call(translationApi.getTranslations);
    yield delay(2000);
    yield call(i18n.addTranslations, "en", messages);
}
