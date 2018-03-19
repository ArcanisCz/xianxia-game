import {NAME} from './constants';

export const getMessages = (state) => state.getIn([NAME, "messages"]);
