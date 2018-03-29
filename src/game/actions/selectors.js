import {Map} from "immutable";
import {createSelector} from "reselect";

import resources from "game/resources";

import {NAME, MEDITATE} from './constants';

export const getProgress = (state, actionName) => state.getIn([NAME, "progress", actionName]);
const perSecondMap = Map({
    [MEDITATE]: () => 0.2,
});
export const getInProgress = createSelector(
    (state) => state.getIn([NAME, "progress"]),
    (map) => map.keySeq().toList(),
);

const canStartMap = Map({
    [MEDITATE]: (state) => resources.getCurrent(state, resources.QI) < resources.getMax(state, resources.QI),
});
export const canStart = (state, actionName) => getProgress(state, actionName) === undefined && canStartMap.get(actionName)(state);

export const getPerSecond = (state, actionName) => perSecondMap.get(actionName)(state);
