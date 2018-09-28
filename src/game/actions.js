import {NAME, RESOURCE_QI} from "./constants";
import {getResourceMax, getBasicTechniqueLevelUpPrice} from "./selectors";

export const SET_RESOURCE = `${NAME}/SET_RESOURCE`;
export const LEVEL_UP_BASIC_TECHNIQUE = `${NAME}/LEVEL_UP_BASIC_TECHNIQUE`;

export const addResource = (resource, amount = 1) => (dispatch, getState) => dispatch({
    type: SET_RESOURCE,
    resource,
    amount,
    max: getResourceMax(getState(), resource),
});

export const levelUpBasicTechnique = () => (dispatch, getState) => dispatch({
    type: LEVEL_UP_BASIC_TECHNIQUE,
    price: getBasicTechniqueLevelUpPrice(getState()),
    resource: RESOURCE_QI,
});
