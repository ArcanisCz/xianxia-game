import {Map} from "immutable";

import {QI} from "definitions/resources";
import resources from "game/resources";

export const CIRCULATE_QI = `action.circulateQi`;

export const perSecondMap = Map({
    [CIRCULATE_QI]: () => 0.5,
});
export const canStartMap = Map({
    [CIRCULATE_QI]: (state) => !resources.isFull(state, QI),
});

export const endActions = Map({
    [CIRCULATE_QI]: resources.add(QI, 1),
});
