import {NAME} from "./constants";
import {getResourceMax, getTechniqueLevelUpPrice} from "./selectors";

export const SET_RESOURCE = `${NAME}/SET_RESOURCE`;
export const LEVEL_UP_BASIC_TECHNIQUE = `${NAME}/LEVEL_UP_BASIC_TECHNIQUE`;

export const addResource = (resource, amount = 1) => (dispatch, getState) => dispatch({
    type: SET_RESOURCE,
    resource,
    amount,
    max: getResourceMax(getState(), resource),
});

export const levelTechnique = (technique) => (dispatch, getState) => dispatch({
    type: LEVEL_UP_BASIC_TECHNIQUE,
    technique,
    price: getTechniqueLevelUpPrice(getState(), technique),
});
