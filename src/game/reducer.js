import {resourceMaxMap, techniquePriceMap} from "./definitions";
import {ADD_RESOURCE, LEVEL_TECHNIQUE} from "./actions";

const initialState = {
    resources: resourcesReducer(undefined, {}),
    techniques: techniquesReducer(undefined, {}),
};
export default (state = initialState, action) => {
    if ([ADD_RESOURCE, LEVEL_TECHNIQUE].includes(action.type)) {
        return {
            resources: resourcesReducer(state.resources, action, state.techniques),
            techniques: techniquesReducer(state.techniques, action, state.resources),
        };
    }
    return state;
};

function resourcesReducer(state = {}, action, techniques) {
    switch (action.type) {
        case ADD_RESOURCE: {
            const max = resourceMaxMap[action.resource](techniques);
            const amount = state[action.resource] || 0;
            return {...state, [action.resource]: ensureRange(amount + action.amount, 0, max)};
        }
        case LEVEL_TECHNIQUE: {
            const price = techniquePriceMap[action.technique](techniques[action.technique] || 0);
            const canLevel = canPay(price, state);
            if (canLevel) {
                return {...state, ...Object.keys(price).reduce(createGetResourcesAfterPay(state, price), {})};
            }
            return state;
        }
        default:
            return state;
    }
}

function techniquesReducer(state = {}, action, resources) {
    switch (action.type) {
        case LEVEL_TECHNIQUE: {
            const price = techniquePriceMap[action.technique](state[action.technique] || 0);
            const canLevel = canPay(price, resources);
            if (canLevel) {
                return {...state, [action.technique]: (state[action.technique] || 0) + 1};
            }
            return state;
        }
        default:
            return state;
    }
}

const createGetResourcesAfterPay = (resources, price) => (memo, resource) => Object.assign(memo, {
    [resource]: resources[resource] - price[resource],
});
const canPay = (price, resources) => Object.keys(price).every((resource) => resources[resource] >= price[resource]);
const ensureRange = (value, min, max) => Math.min(Math.max(value, min), max);
