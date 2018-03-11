import {Map, fromJS} from 'immutable';
import {combineReducers} from "redux-immutable";

import {MESSAGES_LOAD} from "./actions";

const messages = (state = Map(), action) => {
    switch (action.type) {
        case MESSAGES_LOAD:
            return state.merge(fromJS(action.payload));
        default:
            return state;
    }
};

export default combineReducers({
    messages,
});

