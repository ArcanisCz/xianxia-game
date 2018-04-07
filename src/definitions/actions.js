import {Map} from "immutable";

import {QI} from "definitions/resources";
import resources from "game/resources";

export const MEDITATE = `action.meditate`;

export const perSecondMap = Map({
    [MEDITATE]: () => Infinity,
});
export const canStartMap = Map({
    [MEDITATE]: (state) => !resources.isFull(state, QI),
});

export const endActions = Map({
    [MEDITATE]: resources.add(QI, 1),
});
