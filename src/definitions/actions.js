import {Map} from "immutable";

import {isFull} from "game/resources/selectors";
import {add} from "game/resources/actions";

import {QI, CIRCULATE_QI} from "./constants";

export const perSecondMap = Map({
    [CIRCULATE_QI]: () => 1,
});
export const canStartMap = Map({
    [CIRCULATE_QI]: (state) => !isFull(state, QI),
});

export const levelUpPriceMap = Map({
    [CIRCULATE_QI]: () => Map({
        [QI]: 1,
    }),
});

export const endActions = Map({
    [CIRCULATE_QI]: add(QI, 1),
});
