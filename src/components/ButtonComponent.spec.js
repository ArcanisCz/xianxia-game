import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import {getClasses} from "testUtils";

import {ButtonComponent, styles} from './ButtonComponent';

const onClick = () => {
};
const text = "my text asdas555";

const classes = getClasses(styles);
const makeComponent = (props) => shallow(<ButtonComponent classes={classes} onClick={onClick} text={text} {...props} />);

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

    it("should be block element when block prop set", () => {
        const wrapper = makeComponent({block: true});
        expect(wrapper.hasClass(classes.block)).to.equal(true);
    });

    it("should be disabled when disabled prop set", () => {
        const wrapper = makeComponent({disabled: true});
        expect(wrapper.hasClass(classes.disabled)).to.equal(true);
    });

    it("should not call onClick when disabled", () => {
        const onClickSpy = sinon.spy();
        const wrapper = makeComponent({disabled: true, onClick: onClickSpy});
        wrapper.simulate('click');
        expect(onClickSpy.notCalled).to.equal(true);
    });
});

