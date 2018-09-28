import {combineReducers} from "redux";

import {SET_QI, LEVEL_UP_BASIC_TECHNIQUE} from "./actions";

const qi = (state = 0, action) => {
    switch (action.type) {
        case SET_QI:
            return ensureRange(state + action.amount, 0, action.max);
        case LEVEL_UP_BASIC_TECHNIQUE:
            return state - action.price;
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
    qi,
    basicTechnique,
});

const ensureRange = (value, min, max) => Math.min(Math.max(value, min), max);
