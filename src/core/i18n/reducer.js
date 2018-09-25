import {combineReducers} from "redux";

import {MESSAGES_LOAD} from "./actions";

const messages = (state = {}, action) => {
    switch (action.type) {
        case MESSAGES_LOAD:
            return {...action.payload};
        default:
            return state;
    }
};

export default combineReducers({
    messages,
});

