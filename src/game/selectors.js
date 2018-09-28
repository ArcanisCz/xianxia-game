import {createSelector} from "reselect";

import {
    NAME,
    RESOURCE_QI,
    RESOURCE_LONGEVITY,
    TECHNIQUE_BASIC,
} from './constants';

const resourceMaxMap = {
    [RESOURCE_QI]: (state) => getTechniqueLevel(state, TECHNIQUE_BASIC) + 3,
    [RESOURCE_LONGEVITY]: (state) => (getTechniqueLevel(state, TECHNIQUE_BASIC) * 2) + 1,
};

const techniquePriceMap = {
    [TECHNIQUE_BASIC]: (level) => ({
        [RESOURCE_QI]: (level * 2) + 1,
        [RESOURCE_LONGEVITY]: 1,
    }),
};

const getModel = (state) => state[NAME];

export const getResourceAmount = (state, resource) => getModel(state).resources[resource];
export const getResourceMax = (state, resource) => resourceMaxMap[resource](state);

export const getTechniqueLevel = (state, technique) => getModel(state).techniques[technique];
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
