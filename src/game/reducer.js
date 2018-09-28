import {combineReducers} from "redux";

import {SET_QI} from "./actions";

const qi = (state = 5, action) => {
    switch (action.type) {
        case SET_QI:
            return ensureRange(state + action.amount, 0, action.max);
        default:
            return state;
    }
};

export default combineReducers({
    qi,
});

const ensureRange = (value, min, max) => Math.min(Math.max(value, min), max);
