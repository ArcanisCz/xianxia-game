import {expect} from 'chai';

import createStore from "createStore";

import {TECHNIQUES, RESOURCES} from "./constants";
import {levelTechnique, addResource} from './actions';
import {getTechniqueLevel, getResourceAmount, getResourceMax, createTechniqueLevelPrice} from './selectors';

describe('Game reducer', () => {
    let store = null;
    beforeEach(() => {
        store = createStore();
    });

    RESOURCES.forEach((resource) => {
        it(`should add resource '${resource}'`, () => {
            const toAdd = 1;
            const oldAmount = getResourceAmount(store.getState(), resource);
            store.dispatch(addResource(resource, toAdd));
            expect(getResourceAmount(store.getState(), resource)).to.be.eq(oldAmount + toAdd);
        });

        it(`should add resource '${resource}' only up to its max`, () => {
            const max = getResourceMax(store.getState(), resource);
            store.dispatch(addResource(resource, max + 1));
            expect(getResourceAmount(store.getState(), resource)).to.be.eq(max);
        });
    });

    TECHNIQUES.forEach((technique) => {
        it(`should level up technique ${technique} and deduce resources`, () => {
            const getPrices = createTechniqueLevelPrice();
            const prices = getPrices(store.getState(), technique);
            const oldLevel = getTechniqueLevel(store.getState(), technique);
            Object.keys(prices).forEach((resource) => {
                store.dispatch(addResource(resource, prices[resource]));
            });
            store.dispatch(levelTechnique(technique));
            expect(getTechniqueLevel(store.getState(), technique)).to.be.eq(oldLevel + 1);
            Object.keys(prices).forEach((resource) => {
                expect(getResourceAmount(store.getState(), resource)).to.be.eq(0);
            });
        });

        it(`should not level up technique '${technique}' when not having proper resources`, () => {
            const oldLevel = getTechniqueLevel(store.getState(), technique);
            store.dispatch(levelTechnique(technique));
            expect(getTechniqueLevel(store.getState(), technique)).to.be.eq(oldLevel);
        });
    });
});
