import {NAME} from "./constants";

export const ADD_RESOURCE = `${NAME}/ADD_RESOURCE`;
export const PERFORM_RESOURCES_PER_SECOND = `${NAME}/PERFORM_RESOURCES_PER_SECOND`;
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

export const performResourcesPerSecond = () => ({
    type: PERFORM_RESOURCES_PER_SECOND,
});
