import {put, call, fork, all} from 'redux-saga/effects';
import NProgress from "nprogress";

import {fn} from "../util";
import {setInitialized} from './actions';

export default function* (blockingInitStuff = fn.noop, nonBlockingInitStuff = fn.noop) {
    try {
        yield all([
            fork(NProgress.start),
            call(blockingInitStuff),
        ]);
    } catch (e) {
        console.error("error?", e); // TODO
        throw e; // this should propagate to cancel all running sagas, because we cannot really continue
    }
    yield all([
        put(setInitialized()),
        call(NProgress.done),
        fork(nonBlockingInitStuff),
    ]);
}
