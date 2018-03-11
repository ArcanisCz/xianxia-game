import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {SET} from './actions';

const current = (state = Map(), {type, payload, meta}) => {
    switch (type) {
        case SET:
            return state.set(meta.resource, payload);
        default:
            return state;
    }
};

export default combineReducers({
    current,
});
