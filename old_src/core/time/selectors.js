import {app} from "core/util";

import {NAME} from './constants';

const getModel = app.createGetModel(NAME);

export const isInitialized = (state) => getModel(state).initialized;
