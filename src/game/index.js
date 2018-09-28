import reducer from "./reducer";
import {NAME} from "./constants";

export {RESOURCES, TECHNIQUES} from "./constants";
export {
    getResourceAmount,
    getResourceMax,
    getTechniqueLevel,
    createTechniqueLevelPrice,
    createTechniqueCanLevel,
} from "./selectors";
export {addResource, levelTechnique} from "./actions";
export default {
    reducer,
    NAME,
};
