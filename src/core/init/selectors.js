import {NAME} from './constants';

const getModel = (state) => state.get(NAME);

export const isInitialized = (state) => getModel(state).get("initialized");
