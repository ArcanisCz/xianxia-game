import {NAME} from './constants';

const getModel = (state) => state[NAME];

export const isInitialized = (state) => getModel(state).initialized;
