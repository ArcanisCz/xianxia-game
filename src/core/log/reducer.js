import {combineReducers} from "redux-immutable";
import {List, Map} from "immutable";

import {ADD_MESSAGE} from './actions';

const messages = (state = List(), {type, payload}) => {
    switch (type) {
        case ADD_MESSAGE:
            return state.push(Map({date: payload.date, text: payload.text}));
        default:
            return state;
    }
};

export default combineReducers({
    messages,
});
