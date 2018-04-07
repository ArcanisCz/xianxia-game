import {Map, List} from "immutable";

import {NAME, QI, VITALITY, KARMA} from './constants';

export const getCurrent = (state, resourceName) => state.getIn([NAME, "current", resourceName], 0);
const maxMap = Map({
    [QI]: () => 1000,
    [VITALITY]: () => 1000,
    [KARMA]: () => Infinity,
});
export const getMax = (state, resourceName) => maxMap.get(resourceName)(state);
const perSecondMap = Map({
    [QI]: () => 10,
    [VITALITY]: () => 5,
    [KARMA]: () => 0,
});
export const getPerSecond = (state, resourceName) => perSecondMap.get(resourceName)(state);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);
const resources = List([QI, VITALITY, KARMA]);
export const getResourcesList = () => resources;
const mainResources = List([QI, VITALITY]);
export const getMainResources = () => mainResources;
const secondaryResources = List([KARMA]);
export const getSecondaryResources = () => secondaryResources;

