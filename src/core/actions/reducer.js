import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {START_ACTION, SET_PROGRESS_BULK, END_ACTION_BULK} from './actions';

const progress = (state = Map(), {type, payload}) => {
    switch (type) {
        case START_ACTION:
            return state.set(payload.name, 0);
        case SET_PROGRESS_BULK:
            return state.merge(payload);
        case END_ACTION_BULK:
            return state.deleteAll(payload);
        default:
            return state;
    }
};

export default combineReducers({
    progress,
});
