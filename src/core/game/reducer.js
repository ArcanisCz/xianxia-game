import {Map, Record} from "immutable";

import {app} from "core/util";
import time from "core/time";

import {RESOURCES} from "./constants";
import {getResourcePerSecond, getResourceMax} from "./selectors";

const ReourcesRecord = Record(Map(RESOURCES.map((name) => [name, 0])).toJS());

const resources = (state = ReourcesRecord({}), {type, payload}, wholeState) => {
    switch (type) {
        case time.TICK: {
            return state.withMutations((newState) => {
                RESOURCES.forEach((resource) => {
                    const max = getResourceMax(wholeState, resource);
                    const perSecond = getResourcePerSecond(wholeState, resource);
                    const toAdd = perSecond * (payload.ms / 1000);
                    newState[resource] = Math.min(newState[resource] + toAdd, max);
                });
            });
        }
        default:
            return state;
    }
};

export default app.combineReducers({
    resources,
});
