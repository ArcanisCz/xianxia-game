import {createSelector} from "reselect";

import {
    NAME,
    RESOURCE_QI,
    RESOURCE_LONGEVITY,
    TECHNIQUE_QI,
    TECHNIQUE_LONGEVITY,
} from './constants';

const resourceMaxMap = {
    [RESOURCE_QI]: (techs) => techs[TECHNIQUE_QI] + 3,
    [RESOURCE_LONGEVITY]: (techs) => (techs[TECHNIQUE_LONGEVITY]) + 3,
};

const techniquePriceMap = {
    [TECHNIQUE_QI]: (level) => ({
        [RESOURCE_QI]: (level * 2) + 1,
        [RESOURCE_LONGEVITY]: 1,
    }),
    [TECHNIQUE_LONGEVITY]: (level) => ({
        [RESOURCE_QI]: 1,
        [RESOURCE_LONGEVITY]: (level * 2) + 1,
    }),
};

const getModel = (state) => state[NAME];
const getTechniques = (state) => getModel(state).techniques;
const getResources = (state) => getModel(state).resources;

export const getResourceAmount = (state, resource) => getResources(state)[resource];
export const getResourceMax = (state, resource) => resourceMaxMap[resource](getTechniques(state));

export const getTechniqueLevel = (state, technique) => getTechniques(state)[technique];
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
