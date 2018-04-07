import {perSecondMap, secondaryResources, mainResources, maxMap, resources} from "definitions/resources";

import {NAME} from './constants';

export const getCurrent = (state, resourceName) => state.getIn([NAME, "current", resourceName], 0);
export const getMax = (state, resourceName) => maxMap.get(resourceName)(state);
export const getPerSecond = (state, resourceName) => perSecondMap.get(resourceName)(state);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);

export const getResourcesList = () => resources;
export const getMainResources = () => mainResources;
export const getSecondaryResources = () => secondaryResources;

