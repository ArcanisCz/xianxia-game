import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {START, SET_PROGRESS, END, LEVEL_UP_INNER} from './actions';

const progress = (state = Map(), {type, payload, meta}) => {
    switch (type) {
        case START: {
            if (!meta.immediate) {
                return state.set(payload.name, true);
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
    switch (type) {
        case LEVEL_UP_INNER:
            return state.update(payload.name, (value = 0) => value + 1);
        default:
            return state;
    }
};

export default combineReducers({
    progress,
    level,
});
