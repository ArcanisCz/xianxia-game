import {put, call, fork, all} from 'redux-saga/effects';

import {setInitialized} from './actions';

export default function* () {
    try {
        yield call(blockingInitStuff);
    } catch (e) {
        console.error("aaaaa", e); // TODO
        throw e; // this should propagate to cancel all running sagas, because we cannot really continue
    }
    yield all([
        put(setInitialized()),
        call(window.NProgress.done),
        fork(nonBlockingInitStuff),
    ]);
}

function* blockingInitStuff() {
    // TODO
}

function* nonBlockingInitStuff() {
    // TODO
}
