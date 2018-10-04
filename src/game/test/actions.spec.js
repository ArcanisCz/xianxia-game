import {expect} from 'chai';

import createStore from "createStore";

import {RESOURCE_QI} from "../constants";
import {meditate} from '../actions';
import {getResourceAmount} from '../selectors';

describe('Actions', () => {
    let store = null;
    beforeEach(() => {
        store = createStore();
    });

    it(`meditate should increase qi`, () => {
        const originalAmount = getResourceAmount(store.getState(), RESOURCE_QI);
        store.dispatch(meditate());
        const amount = getResourceAmount(store.getState(), RESOURCE_QI);
        expect(amount).to.be.eq(originalAmount + 1);
        store.dispatch(meditate());
        const amount1 = getResourceAmount(store.getState(), RESOURCE_QI);
        expect(amount1).to.be.eq(originalAmount + 2);
    });
});
