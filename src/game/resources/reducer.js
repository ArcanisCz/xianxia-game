import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {SET, SUBTRACT} from './actions';

const current = (state = Map(), {type, payload, meta}) => {
    switch (type) {
        case SET:
            return state.merge(payload);
        case SUBTRACT:
            return state.update(meta.resource, (value = 0) => value - payload.amount);
        default:
            return state;
    }
};

export default combineReducers({
    current,
});
