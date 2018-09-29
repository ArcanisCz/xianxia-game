import {
    RESOURCE_TEST,
    RESOURCE_LONGEVITY,
    RESOURCE_QI,
    TECHNIQUE_TEST,
    TECHNIQUE_LONGEVITY,
    TECHNIQUE_QI,
} from "./constants";

export const resourceMaxMap = {
    [RESOURCE_TEST]: (techs) => (techs[TECHNIQUE_TEST] || 0) + 1,
    [RESOURCE_QI]: (techs) => (techs[TECHNIQUE_QI] || 0) + 3,
    [RESOURCE_LONGEVITY]: (techs) => (techs[TECHNIQUE_LONGEVITY] || 0) + 3,
};

export const techniquePriceMap = {
    [TECHNIQUE_TEST]: (level) => ({
        [RESOURCE_TEST]: (level) + 1,
    }),
    [TECHNIQUE_QI]: (level) => ({
        [RESOURCE_QI]: (level * 2) + 1,
        [RESOURCE_LONGEVITY]: 1,
    }),
    [TECHNIQUE_LONGEVITY]: (level) => ({
        [RESOURCE_QI]: 1,
        [RESOURCE_LONGEVITY]: (level * 2) + 1,
    }),
};
