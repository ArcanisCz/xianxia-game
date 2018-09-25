import {combineReducers} from "redux";

import {SET_INITIALIZED} from "./actions";

const initialized = (state = false, {type}) => (type === SET_INITIALIZED ? true : state);

export default combineReducers({
    initialized,
});

