import {call} from "redux-saga/effects";

import {translationApi} from "./api";
import {init, i18n} from "./core";

export default function* () {
    yield call(init.saga, blocking);
}

function* blocking() {
    const messages = yield call(translationApi.getTranslations);
    yield call(i18n.addTranslations, "en", messages);
}
