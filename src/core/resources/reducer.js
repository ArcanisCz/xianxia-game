import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {SET_BULK} from './actions';

const current = (state = Map(), {type, payload}) => {
    switch (type) {
        case SET_BULK:
            return state.merge(payload);
        default:
            return state;
    }
};

export default combineReducers({
    current,
});
