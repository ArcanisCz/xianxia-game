import {expect} from 'chai';

import createStore from "createStore";

import {RESOURCE_TEST, TECHNIQUE_TEST} from "./constants";
import {levelTechnique, addResource} from './actions';
import {getTechniqueLevel, getResourceAmount, getResourceMax, createTechniqueLevelPrice} from './selectors';

describe('Game reducer', () => {
    let store = null;
    beforeEach(() => {
        store = createStore();
    });

    it(`should have resource amout default to 0`, () => {
        const amount = getResourceAmount(store.getState(), RESOURCE_TEST);
        expect(amount).to.be.eq(0);
    });

    it(`should have resource max as number`, () => {
        const max = getResourceMax(store.getState(), RESOURCE_TEST);
        expect(max).to.be.not.NaN();
    });

    it(`should add resource`, () => {
        const toAdd = 1;
        const oldAmount = getResourceAmount(store.getState(), RESOURCE_TEST);
        store.dispatch(addResource(RESOURCE_TEST, toAdd));
        expect(getResourceAmount(store.getState(), RESOURCE_TEST)).to.be.eq(oldAmount + toAdd);
    });

    it(`should add resource only up to its max`, () => {
        const max = getResourceMax(store.getState(), RESOURCE_TEST);
        store.dispatch(addResource(RESOURCE_TEST, max + 1));
        expect(getResourceAmount(store.getState(), RESOURCE_TEST)).to.be.eq(max);
    });

    it(`shouldn't add resource, which isn't in resource constants list`, () => {
        expect(() => {
            store.dispatch(addResource("aaddas"));
        }).to.throw();
    });

    it(`should level up technique and deduce resources`, () => {
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

    it(`should not level up technique when not having proper resources`, () => {
        const oldLevel = getTechniqueLevel(store.getState(), TECHNIQUE_TEST);
        store.dispatch(levelTechnique(TECHNIQUE_TEST));
        expect(getTechniqueLevel(store.getState(), TECHNIQUE_TEST)).to.be.eq(oldLevel);
    });
});
