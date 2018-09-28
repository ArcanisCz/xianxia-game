import {combineReducers} from "redux";

import {RESOURCES, TECHNIQUES} from "./constants";
import {SET_RESOURCE, LEVEL_UP_BASIC_TECHNIQUE} from "./actions";

const initialResources = RESOURCES.reduce((memo, resource) => Object.assign(memo, {[resource]: 0}), {});
const resources = (state = initialResources, action) => {
    switch (action.type) {
        case SET_RESOURCE:
            return {...state, [action.resource]: ensureRange(state[action.resource] + action.amount, 0, action.max)};
        case LEVEL_UP_BASIC_TECHNIQUE:
            return {...state, ...Object.keys(action.price).reduce((memo, resource) => Object.assign(memo, {[resource]: state[resource] - action.price[resource]}), {})};
        default:
            return state;
    }
};

const initialTechniques = TECHNIQUES.reduce((memo, resource) => Object.assign(memo, {[resource]: 0}), {});
const techniques = (state = initialTechniques, action) => {
    switch (action.type) {
        case LEVEL_UP_BASIC_TECHNIQUE:
            return {...state, [action.technique]: state[action.technique] + 1};
        default:
            return state;
    }
};

export default combineReducers({
    resources,
    techniques,
});

const ensureRange = (value, min, max) => Math.min(Math.max(value, min), max);
