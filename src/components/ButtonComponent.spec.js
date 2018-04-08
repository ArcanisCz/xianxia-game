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
    it("should be block element when block prop set", () => {
        const wrapper = makeComponent({block: true});
        expect(wrapper.hasClass(classes.block)).to.equal(true);
    });

    it('should display text', () => {
        const wrapper = makeComponent();
        expect(wrapper.find(`.${classes.button}`).contains(text)).to.equal(true);
    });

    it('should call onClick on button mouse click', () => {
        const onClickSpy = sinon.spy();
        const wrapper = makeComponent({onClick: onClickSpy});
        wrapper.find(`.${classes.button}`).simulate('click');
        expect(onClickSpy.calledOnce).to.equal(true);
    });

    it("'s button should be disabled when disabled prop set", () => {
        const wrapper = makeComponent({disabled: true});
        expect(wrapper.find(`.${classes.button}`).hasClass(classes.disabled)).to.equal(true);
    });

    it("should not call buttons onClick when disabled", () => {
        const onClickSpy = sinon.spy();
        const wrapper = makeComponent({disabled: true, onClick: onClickSpy});
        wrapper.find(`.${classes.button}`).simulate('click');
        expect(onClickSpy.notCalled).to.equal(true);
    });

    it("should not show levelUp button by default", () => {
        const wrapper = makeComponent();
        expect(wrapper.find(`.${classes.levelUpButton}`).length).to.be.eq(0);
    });

    it("should show levelUp levelUp when onLevelUp is set", () => {
        const wrapper = makeComponent({onLevelUp: () => {}});
        expect(wrapper.find(`.${classes.levelUpButton}`).length).to.be.eq(1);
    });

    it('should call onLevelUp on levelUp mouse click on levelUp button', () => {
        const onClickSpy = sinon.spy();
        const wrapper = makeComponent({onLevelUp: onClickSpy});
        wrapper.find(`.${classes.levelUpButton}`).simulate('click');
        expect(onClickSpy.calledOnce).to.equal(true);
    });
});

