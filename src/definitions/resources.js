import {List, Map} from "immutable";

export const QI = `resource.qi`;
export const VITALITY = `resource.vitality`;
export const KARMA = `resource.karma`;

export const resources = List([QI, VITALITY, KARMA]);
export const mainResources = List([QI, VITALITY]);
export const secondaryResources = List([KARMA]);
export const maxMap = Map({
    [QI]: () => 10,
    [VITALITY]: () => 10,
    [KARMA]: () => Infinity,
});
export const perSecondMap = Map({
    [QI]: () => 0.5,
    [VITALITY]: () => 0.5,
    [KARMA]: () => 0,
});
