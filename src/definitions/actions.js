import {Map} from "immutable";

import resources from "game/resources";
import {MEDITATE} from "game/actions/constants"; // circular dependency hack

export const perSecondMap = Map({
    [MEDITATE]: () => 0.5,
});
export const canStartMap = Map({
    [MEDITATE]: (state) => resources.getCurrent(state, resources.QI) < resources.getMax(state, resources.QI),
});
