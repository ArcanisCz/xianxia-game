import {createSelector} from "reselect";

import {canStartMap, perSecondMap} from "definitions/actions";

import {NAME} from './constants';

export const getProgress = (state, actionName) => state.getIn([NAME, "progress", actionName]);
export const getActionsInProgress = createSelector(
    (state) => state.getIn([NAME, "progress"]),
    (map) => map.keySeq().toList(),
);
export const canStart = (state, actionName) => getProgress(state, actionName) === undefined && canStartMap.get(actionName)(state);
export const getPerSecond = (state, actionName) => perSecondMap.get(actionName)(state);
export const getLevel = (state, actionName) => state.getIn([NAME, "level", actionName]);
