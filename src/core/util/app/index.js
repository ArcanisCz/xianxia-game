import {fromJS, Map} from "immutable";

export default {
    createGetModel: (name) => (state) => state.get(name),
    combineReducers: (reducersObject, initial = false) => {
        const reducers = fromJS(reducersObject);
        return (state = Map(), action, wholeState) => state.withMutations((newState) => {
            reducers.forEach((reducer, key) => {
                newState.update(key, () => reducer(state.get(key), action, initial ? state : wholeState));
            });
        });
    },
};
