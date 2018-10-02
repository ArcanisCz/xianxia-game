import {NAME} from "./constants";

export const ADD_RESOURCE = `${NAME}/ADD_RESOURCE`;
export const LEVEL_TECHNIQUE = `${NAME}/LEVEL_TECHNIQUE`;

export const addResource = (resource, amount = 1) => ({
    type: ADD_RESOURCE,
    resource,
    amount,
});

export const levelTechnique = (technique) => ({
    type: LEVEL_TECHNIQUE,
    technique,
});
