import {NAME} from './constants';

export const getCurrent = (state, resourceName) => state.getIn([NAME, resourceName, "current"]);
export const getMax = (state, resourceName) => state.getIn([NAME, resourceName, "max"]);
export const isFull = (state, resourceName) => getCurrent(state, resourceName) >= getMax(state, resourceName);
