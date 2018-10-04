import reducer from "./reducer";
import saga from "./saga";
import {NAME} from "./constants";

export {RESOURCES, TECHNIQUES} from "./constants";
export {
    getResourceAmount,
    getResourceMax,
    isResourceAtMax,
    getResourcePerSecond,
    getTechniqueLevel,
    createTechniqueLevelPrice,
    createTechniqueCanLevel,
    getVisibleResources,
    getVisibleTechniques,
    canMeditate,
} from "./selectors";
export {
    addResource,
    levelTechnique,
    meditate,
} from "./actions";

export default {
    NAME,
    reducer,
    saga,
};
