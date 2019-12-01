import {Map} from "immutable";

import {
    RESOURCE_TEST,
    RESOURCE_LONGEVITY,
    RESOURCE_QI,
} from "./constants";

export const resourceMaxMap = Map()
    .set(RESOURCE_TEST, () => 10)
    .set(RESOURCE_QI, () => 3)
    .set(RESOURCE_LONGEVITY, () => 3);

export const resourcePerSecondMap = Map()
    .set(RESOURCE_TEST, () => 1)
    .set(RESOURCE_QI, () => 0.5)
    .set(RESOURCE_LONGEVITY, () => 0.5);
