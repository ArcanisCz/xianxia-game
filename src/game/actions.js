import {NAME} from "./constants";
import {getResourceMax, createTechniqueLevelPrice, createTechniqueCanLevel} from "./selectors";

export const SET_RESOURCE = `${NAME}/SET_RESOURCE`;
export const LEVEL_TECHNIQUE = `${NAME}/LEVEL_TECHNIQUE`;

export const addResource = (resource, amount = 1) => (dispatch, getState) => dispatch({
    type: SET_RESOURCE,
    resource,
    amount,
    max: getResourceMax(getState(), resource),
});

const getPrice = createTechniqueLevelPrice();
const canLevel = createTechniqueCanLevel();

export const levelTechnique = (technique) => (dispatch, getState) => canLevel(getState(), technique) && dispatch({
    type: LEVEL_TECHNIQUE,
    technique,
    price: getPrice(getState(), technique),
});
