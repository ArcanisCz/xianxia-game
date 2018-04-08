import {canStartMap, perSecondMap, levelUpPriceMap} from "definitions/actions";

import resources from "game/resources";

import {NAME} from './constants';

export const getProgress = (state, actionName) => state.getIn([NAME, "progress", actionName], false);
export const canStart = (state, actionName) => !getProgress(state, actionName) && canStartMap.get(actionName)(state);
export const getPerSecond = (state, actionName) => perSecondMap.get(actionName)(state);
export const getLevel = (state, actionName) => state.getIn([NAME, "level", actionName], 0);
export const canLevelUp = (state, actionName) => levelUpPriceMap.get(actionName)(state)
    .map((price, resourceName) => resources.getCurrent(state, resourceName) >= price)
    .filter((item) => !item)
    .isEmpty();
