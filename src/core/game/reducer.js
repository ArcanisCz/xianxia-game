import {app} from "core/util";

import {ADD_QI} from "./actions";
import {getQiMax} from "./selectors";

const qi = (state = 0, {type, payload}, wholeState) => {
    switch (type) {
        case ADD_QI: {
            const max = getQiMax(wholeState);
            return Math.min(state + payload.amount, max);
        }
        default:
            return state;
    }
};

export default app.combineReducers({
    qi,
});
