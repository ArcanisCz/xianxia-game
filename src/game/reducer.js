import {combineReducers} from "redux";

import {fn} from "core/util";

import {ADD_RESOURCE, LEVEL_TECHNIQUE} from "./actions";

export const resources = (state = {}, action) => {
    switch (action.type) {
        case ADD_RESOURCE:
            return {...state, [action.resource]: fn.ensureRange((state[action.resource] || 0) + action.amount, 0, action.max)};
        case LEVEL_TECHNIQUE:
            return {
                ...state,
                ...Object.keys(action.price)
                    .reduce((memo, resource) => Object.assign(memo, {[resource]: state[resource] - action.price[resource]}), {}),
            };
        default:
            return state;
    }
};

export const techniques = (state = {}, action) => {
    switch (action.type) {
        case LEVEL_TECHNIQUE:
            return {...state, [action.technique]: (state[action.technique] || 0) + 1};
        default:
            return state;
    }
};

export default combineReducers({
    resources,
    techniques,
});
