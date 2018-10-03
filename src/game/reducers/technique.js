import {Map} from "immutable";

import {LEVEL_TECHNIQUE} from "../actions";

import {getTechniquePrice, canPay, getTechnique} from "./fn";

export default (state = Map(), action, resources) => {
    switch (action.type) {
        case LEVEL_TECHNIQUE:
            return levelTechnique(state, resources, action.technique);
        default:
            return state;
    }
};

const levelTechnique = (techniques, resources, technique) => {
    const price = getTechniquePrice(technique, getTechnique(techniques, technique));
    const canLevel = canPay(price, resources);
    if (canLevel) {
        return techniques.set(technique, (techniques.get(technique) || 0) + 1);
    }
    return techniques;
};
