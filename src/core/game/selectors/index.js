import {app} from "core/util";

import {NAME} from "../constants";

const getModel = app.createGetModel(NAME);

export const getQiValue = (state) => getModel(state).get("qi");
export const getQiMax = () => 10;
