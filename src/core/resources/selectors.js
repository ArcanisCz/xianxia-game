import {Map} from "immutable";

import {NAME, QI} from './constants';

const maxMap = Map({
    [QI]: (state) => 5,
});

export const getCurrent = (state, resourceName) => state.getIn([NAME, "current", resourceName], 0);
export const getMax = (state, resourceName) => maxMap.get(resourceName)(state);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);
