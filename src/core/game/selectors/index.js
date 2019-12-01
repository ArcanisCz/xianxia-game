import {app} from "core/util";

import {NAME} from "../constants";

const getModel = app.createGetModel(NAME);

export const getQiValue = (state) => getModel(state).get("qi");
export const getQiProgress = (state) => getModel(state).get("qiProgress");
export const getQiMax = () => 10;
export const getQiPerSecond = () => 1;
export const getMedidateQiAmount = () => 2;
export const getQiDuration = () => 5000;

