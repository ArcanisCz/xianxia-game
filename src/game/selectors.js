import {NAME, RESOURCE_QI, RESOURCE_LONGEVITY} from './constants';

const resourceMaxMap = {
    [RESOURCE_QI]: (state) => getBasicTechniqueLevel(state) + 3,
    [RESOURCE_LONGEVITY]: (state) => (getBasicTechniqueLevel(state) * 2) + 1,
};

const getModel = (state) => state[NAME];

export const getResourceAmount = (state, resource) => getModel(state).resources[resource];
export const getResourceMax = (state, resource) => resourceMaxMap[resource](state);

export const getBasicTechniqueLevel = (state) => getModel(state).basicTechnique;
export const getBasicTechniqueLevelUpPrice = (state) => (getBasicTechniqueLevel(state) * 2) + 1;
export const canLevelUpBasicTechnique = (state) => getResourceAmount(state, RESOURCE_QI) >= getBasicTechniqueLevelUpPrice(state);
