import {Map} from "immutable";

import {QI} from "definitions/resources";
import resources from "game/resources";

export const MEDITATE = `action.meditate`;

export const perSecondMap = Map({
    [MEDITATE]: () => 0.5,
});
export const canStartMap = Map({
    [MEDITATE]: (state) => resources.getCurrent(state, QI) < resources.getMax(state, QI),
});

export const endActions = Map({
    [MEDITATE]: resources.add(QI, 200),
});
