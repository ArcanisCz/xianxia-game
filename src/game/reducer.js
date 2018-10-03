import {Map} from "immutable";

import {resource, technique} from "./reducers";

export default (state = Map(), action) => state
    .update("resources", () => resource(state.get("resources"), action, state.get("techniques")))
    .update("techniques", () => technique(state.get("techniques"), action, state.get("resources")));
