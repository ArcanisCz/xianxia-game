import reducer from "./reducer";
import {NAME} from "./constants";

export {RESOURCES, TECHNIQUES} from "./constants";
export {
    getResourceAmount,
    getResourceMax,
    getTechniqueLevel,
    getTechniqueLevelUpPrice,
    canLevelUpTechnique,
} from "./selectors";
export {addResource, levelTechnique} from "./actions";
export default {
    reducer,
    NAME,
};
