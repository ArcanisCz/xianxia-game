import {call, put, fork} from "redux-saga/effects";

import {translationApi} from "./api";
import {init, i18n, time} from "./core";

export default function* () {
    yield call(init.saga, blocking);

    yield fork(time.saga);
    // yield put(time.start());
}

function* blocking() {
    const messages = yield call(translationApi.getTranslations);
    yield call(i18n.addTranslations, "en", messages);
}
