import {Map} from "immutable";

import {NAME, QI} from './constants';

export const getCurrent = (state, resourceName) => state.getIn([NAME, "current", resourceName], 0);
const maxMap = Map({
    [QI]: (state) => 5 + Math.floor(getCurrent(state, QI) * 0.5),
});
export const getMax = (state, resourceName) => maxMap.get(resourceName)(state);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);
