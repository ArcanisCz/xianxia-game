import {List, Map} from "immutable";

export const QI = `resource.qi`;
export const VITALITY = `resource.vitality`;
export const KARMA = `resource.karma`;

export const resources = List([QI, VITALITY, KARMA]);
export const mainResources = List([QI, VITALITY]);
export const secondaryResources = List([KARMA]);
export const maxMap = Map({
    [QI]: () => 1000,
    [VITALITY]: () => 1000,
    [KARMA]: () => Infinity,
});
export const perSecondMap = Map({
    [QI]: () => 10,
    [VITALITY]: () => 5,
    [KARMA]: () => 0,
});
