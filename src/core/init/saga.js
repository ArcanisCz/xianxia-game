import {delay} from 'redux-saga';
import {put, call, fork, all} from 'redux-saga/effects';

import {setInitialized} from './actions';

export default function* () {
    try {
        yield call(blockingInitStuff);
    } catch (e) {
        // untranslated, because at this state, i18n is not loaded yet
        console.error("aaaaa", e);
        throw e; // this should propagate to cancel all running sagas, because we cannot really continue
    }
    yield all([
        put(setInitialized()),
        fork(nonBlockingInitStuff),
    ]);
}

function* blockingInitStuff() {
    console.log("blocking");
    yield call(delay, 2000);
    console.log("finished");
}

function* nonBlockingInitStuff() {

}
