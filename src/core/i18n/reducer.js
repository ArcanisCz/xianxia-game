import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

import {MESSAGES_LOAD} from "./actions";

const messages = (state = Map(), action) => {
    switch (action.type) {
        case MESSAGES_LOAD:
            return Map(action.payload);
        default:
            return state;
    }
};

export default combineReducers({
    messages,
});
