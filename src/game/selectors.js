import {NAME} from './constants';

const getModel = (state) => state[NAME];

export const getQi = (state) => getModel(state).qi;
export const getMaxQi = (state) => getBasicTechniqueLevel(state) + 3;
export const getBasicTechniqueLevel = (state) => getModel(state).basicTechnique;
export const getBasicTechniqueLevelUpPrice = (state) => (getBasicTechniqueLevel(state) * 2) + 1;
export const canLevelUpBasicTechnique = (state) => getQi(state) >= getBasicTechniqueLevelUpPrice(state);
