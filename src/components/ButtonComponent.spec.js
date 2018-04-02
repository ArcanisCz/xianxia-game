import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import {getClasses} from "testUtils";

import {ButtonComponent, styles} from './ButtonComponent';

const onClick = () => {
};
const text = "my text asdas555";

const makeComponent = (props) => shallow(<ButtonComponent classes={getClasses(styles)} onClick={onClick} text={text} {...props} />);

describe('ButtonComponent', () => {
    it('should display text', () => {
        const wrapper = makeComponent();
        expect(wrapper.contains(text)).to.equal(true);
    });

    it('should call onClick on mouse click', () => {
        const onClickSpy = sinon.spy();
        const wrapper = makeComponent({onClick: onClickSpy});
        wrapper.simulate('click');
        expect(onClickSpy.calledOnce).to.equal(true);
    });

    // .. TODO
});

