import {List} from "immutable";
import {app} from "core/util";

import {NAME, RESOURCES} from "./constants";
import {resourceMaxMap, resourcePerSecondMap} from "./definitions";

const getModel = app.createGetModel(NAME);

export const getResourceValue = (state, resource) => getModel(state).getIn(["resources", resource]);
export const getResourceMax = (state, resource) => resourceMaxMap.get(resource)();
export const getResourcePerSecond = (state, resource) => resourcePerSecondMap.get(resource)();
export const getResources = () => List(RESOURCES);
