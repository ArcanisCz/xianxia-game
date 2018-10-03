import {Map} from "immutable";

import {
    RESOURCE_TEST,
    RESOURCE_LONGEVITY,
    RESOURCE_QI,
    TECHNIQUE_TEST,
    TECHNIQUE_LONGEVITY,
    TECHNIQUE_QI,
} from "./constants";

export const resourceMaxMap = Map()
    .set(RESOURCE_TEST, (techs) => t(techs, TECHNIQUE_TEST) + 10)
    .set(RESOURCE_QI, (techs) => t(techs, TECHNIQUE_QI) + 3)
    .set(RESOURCE_LONGEVITY, (techs) => t(techs, TECHNIQUE_LONGEVITY) + 3);

export const resourcePerSecondMap = Map()
    .set(RESOURCE_TEST, () => 1)
    .set(RESOURCE_QI, (techs) => t(techs, TECHNIQUE_QI) * 0.5)
    .set(RESOURCE_LONGEVITY, (techs) => t(techs, TECHNIQUE_LONGEVITY) * 0.5);

export const techniquePriceMap = Map()
    .set(TECHNIQUE_TEST, (level) => Map({
        [RESOURCE_TEST]: (level) + 1,
    }))
    .set(TECHNIQUE_QI, (level) => Map({
        [RESOURCE_QI]: (level * 2) + 1,
        [RESOURCE_LONGEVITY]: 1,
    }))
    .set(TECHNIQUE_LONGEVITY, (level) => Map({
        [RESOURCE_QI]: 1,
        [RESOURCE_LONGEVITY]: (level * 2) + 1,
    }));

const t = (techs, name) => techs.get(name, 0);
