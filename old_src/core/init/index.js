import {NAME} from './constants';
import saga from './saga';
import reducer from './reducer';
import {setInitialized} from "./actions";
import {isInitialized} from "./selectors";

export default {
    NAME,
    saga,
    reducer,
    setInitialized,
    isInitialized,
};
