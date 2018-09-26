import reducer from "./reducer";
import {NAME} from "./constants";

export {getQi, getMaxQi} from "./selectors";
export {addQi} from "./actions";
export default {
    reducer,
    NAME,
};
