import {combineReducers} from "redux-immutable";

import {SET_INITIALIZED} from "./actions";

const initialized = (state = false, {type}) => (type === SET_INITIALIZED ? true : state);

export default combineReducers({
    initialized,
});
