import {app} from "core/util";
import time from "core/time";

import {MEDITATE} from "./actions";
import {getQiMax, getQiPerSecond, getQiDuration, getMedidateQiAmount, getQiProgress} from "./selectors";

const qi = (state = 0, {type}, wholeState) => {
    switch (type) {
        case time.TICK: {
            const max = getQiMax(wholeState);
            const perSecond = getQiPerSecond(wholeState);
            const duration = getQiDuration(wholeState);
            const getToAdd = getMedidateQiAmount(wholeState);
            const progress = getQiProgress(wholeState);

            let toAdd = perSecond;
            if (progress === duration) {
                toAdd += getToAdd;
            }
            return Math.max(Math.min(state + toAdd, max), 0);
        }
        default:
            return state;
    }
};

const qiProgress = (state = 0, {type}, wholeState) => {
    switch (type) {
        case MEDITATE:
            if (state === 0) {
                return 1000;
            }
            return state;
        case time.TICK: {
            const duration = getQiDuration(wholeState);
            if (state >= duration) {
                return 0;
            } else if (state !== 0) {
                return state + 1000;
            }
            return state;
        }
        default:
            return state;
    }
};

export default app.combineReducers({
    qi,
    qiProgress,
});
