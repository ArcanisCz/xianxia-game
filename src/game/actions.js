import {NAME} from "./constants";
import {getMaxQi} from "./selectors";

export const SET_QI = `${NAME}/SET_QI`;

export const addQi = (amount) => (dispatch, getState) => dispatch({
    type: SET_QI,
    amount,
    max: getMaxQi(getState()),
});
