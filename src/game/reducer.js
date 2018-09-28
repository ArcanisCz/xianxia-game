import {combineReducers} from "redux";

import {RESOURCES} from "./constants";
import {SET_RESOURCE, LEVEL_UP_BASIC_TECHNIQUE} from "./actions";

const initialResources = RESOURCES.reduce((memo, resource) => Object.assign(memo, {[resource]: 0}), {});
const resources = (state = initialResources, action) => {
    switch (action.type) {
        case SET_RESOURCE:
            return {...state, [action.resource]: ensureRange(state[action.resource] + action.amount, 0, action.max)};
        case LEVEL_UP_BASIC_TECHNIQUE:
            return {...state, [action.resource]: state[action.resource] - action.price};
        default:
            return state;
    }
};

const basicTechnique = (state = 0, action) => {
    switch (action.type) {
        case LEVEL_UP_BASIC_TECHNIQUE:
            return state + 1;
        default:
            return state;
    }
};

export default combineReducers({
    resources,
    basicTechnique,
});

const ensureRange = (value, min, max) => Math.min(Math.max(value, min), max);
