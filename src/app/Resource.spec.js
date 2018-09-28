import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import {Resource} from './Resource';

describe('Resource', () => {
    it("aaa", () => {
        const wrapper = shallow(<Resource max={1} onAddQi={null} canAdd resource="aa" value={3} />);
        expect(wrapper.hasClass("aa")).to.equal(true);
    });
});
