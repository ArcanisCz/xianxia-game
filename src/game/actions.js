import {NAME} from "./constants";
import {getMaxQi, getBasicTechniqueLevelUpPrice} from "./selectors";

export const SET_QI = `${NAME}/SET_QI`;
export const LEVEL_UP_BASIC_TECHNIQUE = `${NAME}/LEVEL_UP_BASIC_TECHNIQUE`;

export const addQi = (amount = 1) => (dispatch, getState) => dispatch({
    type: SET_QI,
    amount,
    max: getMaxQi(getState()),
});

export const levelUpBasicTechnique = () => (dispatch, getState) => dispatch({
    type: LEVEL_UP_BASIC_TECHNIQUE,
    price: getBasicTechniqueLevelUpPrice(getState()),
});
