import {NAME} from '../constants';

export const ADD_QI = `${NAME}/ADD_QI`;

export const addQi = (amount) => ({
    type: ADD_QI,
    payload: {amount},
});
