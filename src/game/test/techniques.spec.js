import {expect} from 'chai';

import createStore from "createStore";

import {TECHNIQUE_TEST} from "../constants";
import {levelTechnique, addResource} from '../actions';
import {getTechniqueLevel, getResourceAmount, createTechniqueLevelPrice} from '../selectors';

describe('Techiques', () => {
    let store = null;
    beforeEach(() => {
        store = createStore();
    });

    it(`should level up and deduce resources`, () => {
        const REMAINING = 1;
        const getPrices = createTechniqueLevelPrice();
        const prices = getPrices(store.getState(), TECHNIQUE_TEST);
        const oldLevel = getTechniqueLevel(store.getState(), TECHNIQUE_TEST);
        prices.forEach((price, resource) => {
            store.dispatch(addResource(resource, price + REMAINING));
        });
        store.dispatch(levelTechnique(TECHNIQUE_TEST));
        expect(getTechniqueLevel(store.getState(), TECHNIQUE_TEST)).to.be.eq(oldLevel + 1, "level");
        prices.forEach((price, resource) => {
            expect(getResourceAmount(store.getState(), resource)).to.be.eq(REMAINING, `resource ${resource}`);
        });
    });

    it(`should not level up when not having proper resources`, () => {
        const oldLevel = getTechniqueLevel(store.getState(), TECHNIQUE_TEST);
        store.dispatch(levelTechnique(TECHNIQUE_TEST));
        expect(getTechniqueLevel(store.getState(), TECHNIQUE_TEST)).to.be.eq(oldLevel);
    });
});
