import {NAME} from './constants';
import reducer from './reducer';

import * as actions from "./actions";
import * as selectors from "./selectors";

export const gameSelectors = selectors;
export const gameActions = actions;

export default {
    NAME,
    reducer,
};
