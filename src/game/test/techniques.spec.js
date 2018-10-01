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
        const getPrices = createTechniqueLevelPrice();
        const prices = getPrices(store.getState(), TECHNIQUE_TEST);
        const oldLevel = getTechniqueLevel(store.getState(), TECHNIQUE_TEST);
        Object.keys(prices).forEach((resource) => {
            store.dispatch(addResource(resource, prices[resource]));
        });
        store.dispatch(levelTechnique(TECHNIQUE_TEST));
        expect(getTechniqueLevel(store.getState(), TECHNIQUE_TEST)).to.be.eq(oldLevel + 1);
        Object.keys(prices).forEach((resource) => {
            expect(getResourceAmount(store.getState(), resource)).to.be.eq(0);
        });
    });

    it(`should not level up when not having proper resources`, () => {
        const oldLevel = getTechniqueLevel(store.getState(), TECHNIQUE_TEST);
        store.dispatch(levelTechnique(TECHNIQUE_TEST));
        expect(getTechniqueLevel(store.getState(), TECHNIQUE_TEST)).to.be.eq(oldLevel);
    });
});
