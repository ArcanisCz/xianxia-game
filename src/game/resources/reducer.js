import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {SET} from './actions';

const current = (state = Map(), {type, payload}) => {
    switch (type) {
        case SET:
            return state.merge(payload);
        default:
            return state;
    }
};

export default combineReducers({
    current,
});
