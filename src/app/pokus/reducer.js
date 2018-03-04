import {ADD} from "./actions";

export default (state = 0, {type}) => type === ADD ? state + 1 : state;
