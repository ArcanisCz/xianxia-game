import {combineReducers} from "redux-immutable";

import pokus from "./pokus";

export default combineReducers({
    [pokus.NAME]: pokus.reducer,
});
