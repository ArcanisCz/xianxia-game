import {NAME} from "./constants";
import {getResourceMax, createTechniqueLevelPrice, createTechniqueCanLevel} from "./selectors";

export const ADD_RESOURCE = `${NAME}/ADD_RESOURCE`;
export const LEVEL_TECHNIQUE = `${NAME}/LEVEL_TECHNIQUE`;

const getPrice = createTechniqueLevelPrice();
const canLevel = createTechniqueCanLevel();

export const addResource = (resource, amount = 1) => (dispatch, getState) => dispatch(addResourceInternal(
    resource,
    amount,
    getResourceMax(getState(), resource),
));

export const addResourceInternal = (resource, amount = 1, max) => ({
    type: ADD_RESOURCE,
    resource,
    amount,
    max,
});

export const levelTechnique = (technique) => (dispatch, getState) => canLevel(getState(), technique) && dispatch({
    type: LEVEL_TECHNIQUE,
    technique,
    price: getPrice(getState(), technique),
});
