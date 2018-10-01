import {createSelector} from "reselect";

import {NAME} from './constants';
import {resourceMaxMap, techniquePriceMap, resourcePerSecondMap} from "./definitions";

const getModel = (state) => state[NAME];
const getTechniques = (state) => getModel(state).techniques;
const getResources = (state) => getModel(state).resources;

export const getResourceAmount = (state, resource) => getResources(state)[resource] || 0;
export const getResourceMax = (state, resource) => resourceMaxMap[resource](getTechniques(state));
export const isResourceAtMax = (state, resource) => getResourceAmount(state, resource) >= getResourceMax(state, resource);
export const getResourcePerSecond = (state, resource) => resourcePerSecondMap[resource](getTechniques(state));
export const getRealResourcePerSecond = (state, resource) => {
    const toAdd = getResourcePerSecond(state, resource);
    if (toAdd === 0) {
        return 0;
    }
    const value = getResourceAmount(state, resource);
    const max = getResourceMax(state, resource);
    if (toAdd < 0 && value <= 0) {
        return 0;
    }
    if (toAdd > 0 && value >= max) {
        return 0;
    }
    return toAdd;
};

export const getTechniqueLevel = (state, technique) => getTechniques(state)[technique] || 0;
export const createTechniqueLevelPrice = () => createSelector(
    (state, technique) => technique,
    (state, technique) => getTechniqueLevel(state, technique),
    (technique, level) => techniquePriceMap[technique](level),
);
export const createTechniqueCanLevel = () => {
    const getTechniqueLevelUpPrice = createTechniqueLevelPrice();
    return (state, technique) => {
        const prices = getTechniqueLevelUpPrice(state, technique);
        return Object.keys(prices).every((resource) => getResourceAmount(state, resource) >= prices[resource]);
    };
};
