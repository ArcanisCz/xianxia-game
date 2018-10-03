import {resourceMaxMap, resourcePerSecondMap, techniquePriceMap} from "../definitions";

export const getResource = (resources, resource) => resources.get(resource, 0);
export const getResourceMax = (resource, techniques) => resourceMaxMap.get(resource)(techniques);
export const getResourcePerSecond = (techniques, resource) => resourcePerSecondMap.get(resource)(techniques);

export const getTechniquePrice = (technique, level) => techniquePriceMap.get(technique)(level);
export const getTechnique = (techniques, technique) => techniques.get(technique, 0);

export const canPay = (price, resources) => price.every((value, resource) => getResource(resources, resource) >= value);
export const ensureRange = (value, min, max) => Math.min(Math.max(value, min), max);
