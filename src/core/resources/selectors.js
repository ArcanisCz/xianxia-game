import {Map, List} from "immutable";

import {NAME, QI} from './constants';

export const getCurrent = (state, resourceName) => state.getIn([NAME, "current", resourceName], 0);
const maxMap = Map({
    [QI]: () => 5,
});
export const getMax = (state, resourceName) => maxMap.get(resourceName)(state);
const perSecondMap = Map({
    [QI]: () => 0.5,
});
export const getPerSecond = (state, resourceName) => perSecondMap.get(resourceName)(state);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);
const resources = List([QI]);
export const getResourcesList = () => resources;
