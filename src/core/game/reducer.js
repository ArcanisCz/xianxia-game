import {Map, Record} from "immutable";

import {app} from "core/util";
import time from "core/time";

import {RESOURCES, TECHNIQUES} from "./constants";
import {TECHNIQUE_LEVEL_UP} from "./actions";
import {
    getResourcePerSecond,
    getResourceMax,
    getTechniquePrice,
    canPayTechniqueLevelUp,
} from "./selectors";

const ReourcesRecord = Record(Map(RESOURCES.map((name) => [name, 0])).toJS());
const TechniquesRecord = Record(Map(TECHNIQUES.map((name) => [name, 0])).toJS());

const resources = (state = ReourcesRecord({}), {type, payload}, wholeState) => {
    switch (type) {
        case time.TICK: {
            return state.withMutations((newState) => {
                RESOURCES.forEach((resource) => {
                    const max = getResourceMax(wholeState, resource);
                    const perSecond = getResourcePerSecond(wholeState, resource);
                    const toAdd = perSecond * (payload.ms / 1000);
                    newState.set(resource, Math.min(newState[resource] + toAdd, max));
                });
            });
        }
        case TECHNIQUE_LEVEL_UP: {
            if (canPayTechniqueLevelUp(wholeState, payload.technique)) {
                const priceMap = getTechniquePrice(wholeState, payload.technique);
                return state.merge(priceMap.map((price, resource) => state[resource] - price));
            }
            return state;
        }
        default:
            return state;
    }
};

const techniqueLevels = (state = TechniquesRecord({}), {type, payload}, wholeState) => {
    switch (type) {
        case TECHNIQUE_LEVEL_UP: {
            if (canPayTechniqueLevelUp(wholeState, payload.technique)) {
                return state.update(payload.technique, (level) => level + 1);
            }
            return state;
        }
        default:
            return state;
    }
};

export default app.combineReducers({
    resources,
    techniqueLevels,
});
