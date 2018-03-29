import {Map, List} from "immutable";

import {NAME, QI, KARMA} from './constants';

export const getCurrent = (state, resourceName) => state.getIn([NAME, "current", resourceName], 0);
const maxMap = Map({
    [QI]: () => 2,
    [KARMA]: () => Infinity,
});
export const getMax = (state, resourceName) => maxMap.get(resourceName)(state);
const perSecondMap = Map({
    [QI]: () => 0,
    [KARMA]: () => 0,
});
export const getPerSecond = (state, resourceName) => perSecondMap.get(resourceName)(state);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);
const resources = List([QI, KARMA]);
export const getResourcesList = () => resources;
export const getVisibleResources = () => resources;

