import {Map} from "immutable";
import {
    ADD_RESOURCE,
    LEVEL_TECHNIQUE,
    PERFORM_RESOURCES_PER_SECOND,
    MEDITATE,
} from "../actions";
import {RESOURCES, RESOURCE_QI} from "../constants";

import {
    getResource,
    getResourceMax,
    getTechniquePrice,
    canPay,
    ensureRange,
    getResourcePerSecond,
    getTechnique,
} from "./fn";

export default (state = Map(), action, techniques) => {
    switch (action.type) {
        case ADD_RESOURCE:
            return addResource(state, techniques, action.resource, action.amount);
        case LEVEL_TECHNIQUE:
            return levelTechnique(state, techniques, action.technique);
        case PERFORM_RESOURCES_PER_SECOND:
            return addPerSecond(state, techniques);
        case MEDITATE:
            return addResource(state, techniques, RESOURCE_QI, 1);
        default:
            return state;
    }
};

const addResource = (resources, techniques, resource, toAdd) => {
    const max = getResourceMax(resource, techniques);
    const amount = getResource(resources, resource);
    return resources.set(resource, ensureRange(amount + toAdd, 0, max));
};

const levelTechnique = (resources, techniques, technique) => {
    const price = getTechniquePrice(technique, getTechnique(techniques, technique));
    const canLevel = canPay(price, resources);
    if (canLevel) {
        return resources.merge(price.map((value, resource) => getResource(resources, resource) - value));
    }
    return resources;
};

const addPerSecond = (resources, techniques) => RESOURCES.reduce((memo, resource) => {
    const amount = getResource(resources, resource);
    const max = getResourceMax(resource, techniques);
    const toAdd = getResourcePerSecond(techniques, resource);
    if (toAdd === 0) {
        return memo;
    }
    if (toAdd < 0 && amount <= 0) {
        return memo;
    }
    if (toAdd > 0 && amount >= max) {
        return memo;
    }
    return memo.set(resource, ensureRange(amount + toAdd, 0, max));
}, resources);
