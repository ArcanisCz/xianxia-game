import {expect} from 'chai';

import createStore from "createStore";

import {RESOURCE_TEST} from "../constants";
import {addResource} from '../actions';
import {getResourceAmount, getResourceMax} from '../selectors';

describe('Resources', () => {
    let store = null;
    beforeEach(() => {
        store = createStore();
    });

    it(`should have default amount of 0`, () => {
        const amount = getResourceAmount(store.getState(), RESOURCE_TEST);
        expect(amount).to.be.eq(0);
    });

    it(`should not have max as NaN`, () => {
        const max = getResourceMax(store.getState(), RESOURCE_TEST);
        expect(max).to.be.not.NaN();
    });

    it(`should be addable`, () => {
        const toAdd = 1;
        const oldAmount = getResourceAmount(store.getState(), RESOURCE_TEST);
        store.dispatch(addResource(RESOURCE_TEST, toAdd));
        expect(getResourceAmount(store.getState(), RESOURCE_TEST)).to.be.eq(oldAmount + toAdd);
    });

    it(`should be addable only up to their max`, () => {
        const max = getResourceMax(store.getState(), RESOURCE_TEST);
        store.dispatch(addResource(RESOURCE_TEST, max + 1));
        expect(getResourceAmount(store.getState(), RESOURCE_TEST)).to.be.eq(max);
    });

    it(`shouldn't add resource, which isn't in resource constants list`, () => {
        expect(() => {
            store.dispatch(addResource("aaddas"));
        }).to.throw();
    });
});
