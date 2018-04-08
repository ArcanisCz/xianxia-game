import {List, Map} from "immutable";

import actions from "game/actions";

import {CIRCULATE_QI, QI} from "./constants";

export const resources = List([QI]);
export const mainResources = List([QI]);
export const secondaryResources = List([]);
export const maxMap = Map({
    [QI]: (state) => 1 + actions.getLevel(state, CIRCULATE_QI),
    // [VITALITY]: () => 10,
    // [KARMA]: () => Infinity,
});
export const perSecondMap = Map({
    [QI]: () => 0,
    // [VITALITY]: () => 0,
    // [KARMA]: () => 0,
});
