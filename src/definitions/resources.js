import {List, Map} from "immutable";

export const QI = `resource.qi`;
// export const VITALITY = `resource.vitality`;
// export const KARMA = `resource.karma`;

export const resources = List([QI]);
export const mainResources = List([QI]);
export const secondaryResources = List([]);
export const maxMap = Map({
    [QI]: () => 10,
    // [VITALITY]: () => 10,
    // [KARMA]: () => Infinity,
});
export const perSecondMap = Map({
    [QI]: () => 0,
    // [VITALITY]: () => 0,
    // [KARMA]: () => 0,
});
