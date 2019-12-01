import {Map} from "immutable";

import {
    RESOURCE_TEST,
    RESOURCE_LONGEVITY,
    RESOURCE_QI,
    TECHNIQUE_LONGEVITY,
    TECHNIQUE_QI,
    TECHNIQUE_TEST,
} from "./constants";

/* eslint-disable no-unused-vars */
export const resourceMaxMap = Map([
    [RESOURCE_TEST, ({techniques}) => 10],
    [RESOURCE_QI, ({techniques}) => 3],
    [RESOURCE_LONGEVITY, ({techniques}) => 3],
]);

export const resourcePerSecondMap = Map([
    [RESOURCE_TEST, ({techniques}) => 1],
    [RESOURCE_QI, ({techniques}) => 0.5],
    [RESOURCE_LONGEVITY, ({techniques}) => 0.5],
]);

export const techniquePriceMap = Map([
    [TECHNIQUE_TEST, ({level, techniques}) => Map({
        [RESOURCE_TEST]: (level) + 1,
    })],
    [TECHNIQUE_QI, ({level, techniques}) => Map({
        [RESOURCE_QI]: (level * 2) + 1,
    })],
    [TECHNIQUE_LONGEVITY, ({level, techniques}) => Map({
        [RESOURCE_LONGEVITY]: (level * 2) + 1,
    })],
]);
