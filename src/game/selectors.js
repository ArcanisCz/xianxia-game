import {createSelector} from "reselect";
import {Map} from "immutable";

import {NAME} from './constants';
import {
    getResourceFn,
    getResourceMaxFn,
    canPayFn,
    getResourcePerSecondFn,
    getTechniqueFn,
    getTechniquePriceFn,
} from "./reducers";

const getModel = (state) => state.get(NAME);
const getTechniques = (state) => getModel(state).get("techniques");
const getResources = (state) => getModel(state).get("resources");

export const getResourceAmount = (state, resource) => getResourceFn(getResources(state), resource);
export const getResourceMax = (state, resource) => getResourceMaxFn(resource, getTechniques(state));
export const isResourceAtMax = (state, resource) => getResourceAmount(state, resource) >= getResourceMax(state, resource);
export const getResourcePerSecond = (state, resource) => getResourcePerSecondFn(getTechniques(state), resource);

export const getTechniqueLevel = (state, technique) => getTechniqueFn(getTechniques(state), technique);
export const createTechniqueLevelPrice = () => createSelector(
    (state, technique) => technique,
    (state, technique) => getTechniqueLevel(state, technique),
    (technique, level) => getTechniquePriceFn(technique, level),
);
export const createTechniqueCanLevel = () => {
    const getTechniqueLevelUpPrice = createTechniqueLevelPrice();
    return (state, technique) => {
        const prices = Map(getTechniqueLevelUpPrice(state, technique));
        return canPayFn(prices, getResources(state));
    };
};
