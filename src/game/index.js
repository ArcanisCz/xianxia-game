import reducer from "./reducer";
import {NAME} from "./constants";

export {RESOURCE_QI, RESOURCES} from "./constants";
export {
    getResourceAmount,
    getResourceMax,
    getBasicTechniqueLevel,
    getBasicTechniqueLevelUpPrice,
    canLevelUpBasicTechnique,
} from "./selectors";
export {addResource, levelUpBasicTechnique} from "./actions";
export default {
    reducer,
    NAME,
};
