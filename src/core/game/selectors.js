import {List} from "immutable";
import {app} from "core/util";

import {NAME, RESOURCES, TECHNIQUES, ACTIVITIES} from "./constants";
import {resourceMaxMap, resourcePerSecondMap, techniquePriceMap} from "./definitions";

const getModel = app.createGetModel(NAME);

const getResourceValues = (state) => getModel(state).get("resources");
const getTechniqueLevels = (state) => getModel(state).get("techniqueLevels");

export const getResources = () => List(RESOURCES);
export const getResourceValue = (state, resource) => getResourceValues(state).get(resource);
export const getResourceMax = (state, resource) => {
    const techniques = getTechniqueLevels(state);
    return resourceMaxMap.get(resource)({techniques});
};
export const getResourcePerSecond = (state, resource) => {
    const techniques = getTechniqueLevels(state);
    return resourcePerSecondMap.get(resource)({techniques});
};

export const getTechniques = () => List(TECHNIQUES);
export const getTechniqueLevel = (state, technique) => getTechniqueLevels(state).get(technique);
export const getTechniquePrice = (state, technique) => {
    const level = getTechniqueLevel(state, technique);
    const techniques = getTechniqueLevels(state);
    return techniquePriceMap.get(technique)({level, techniques});
};
export const canPayTechniqueLevelUp = (state, technique) => {
    const priceMap = getTechniquePrice(state, technique);
    return priceMap.every((price, resource) => {
        const amount = getResourceValue(state, resource);
        return amount >= price;
    });
};

export const getActivities = () => List(ACTIVITIES);
export const getActiveActivity = (state) => getModel(state).get("activeActivity");
