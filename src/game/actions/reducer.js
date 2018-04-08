import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {START, SET_PROGRESS, END} from './actions';

const progress = (state = Map(), {type, payload, meta}) => {
    switch (type) {
        case START: {
            if (!meta.immediate) {
                return state.set(payload.name, 0);
            }
            return state;
        }
        case SET_PROGRESS:
            return state.merge(payload.progressMap);
        case END:
            return state.deleteAll(payload.namesList);
        default:
            return state;
    }
};

const level = (state = Map(), {type, payload}) => {
    return state;
};

export default combineReducers({
    progress,
    level,
});
