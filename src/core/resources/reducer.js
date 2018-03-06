import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {QI} from "./constants";
import {ADD} from './actions';

const current = (state = 0, {type, payload}, maxValue) => {
    switch (type) {
        case ADD:
            return Math.min(state + payload, maxValue);
        default:
            return state;
    }
};
const max = (state = 11) => state;

const resource = (state = Map(), action) => {
    const maxValue = max(state.get("max"), action);
    const currentValue = current(state.get("current"), action, maxValue);
    return Map({
        max: maxValue,
        current: currentValue,
    });
};

export default combineReducers({
    [QI]: resource,
});
