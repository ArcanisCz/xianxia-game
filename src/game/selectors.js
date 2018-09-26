import {NAME} from './constants';

const getModel = (state) => state[NAME];

export const getQi = (state) => getModel(state).qi;
export const getMaxQi = () => 10;
