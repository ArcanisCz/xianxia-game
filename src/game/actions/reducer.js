import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {START_ACTION, SET_PROGRESS, END_ACTION} from './actions';

const progress = (state = Map(), {type, payload, meta}) => {
    switch (type) {
        case START_ACTION: {
            if (!meta.immediate) {
                return state.set(payload.name, 0);
            }
            return state;
        }
        case SET_PROGRESS:
            return state.merge(payload.progressMap);
        case END_ACTION:
            return state.deleteAll(payload.namesList);
        default:
            return state;
    }
};

export default combineReducers({
    progress,
});
