import {Map, List} from "immutable";

import {NAME, QI, VITALITY, KARMA} from './constants';

const resources = List([QI, VITALITY, KARMA]);
const mainResources = List([QI, VITALITY]);
const secondaryResources = List([KARMA]);
const maxMap = Map({
    [QI]: () => 1000,
    [VITALITY]: () => 1000,
    [KARMA]: () => Infinity,
});
const perSecondMap = Map({
    [QI]: () => 10,
    [VITALITY]: () => 5,
    [KARMA]: () => 0,
});

export const getCurrent = (state, resourceName) => state.getIn([NAME, "current", resourceName], 0);
export const getMax = (state, resourceName) => maxMap.get(resourceName)(state);
export const getPerSecond = (state, resourceName) => perSecondMap.get(resourceName)(state);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);
export const getResourcesList = () => resources;
export const getMainResources = () => mainResources;
export const getSecondaryResources = () => secondaryResources;

