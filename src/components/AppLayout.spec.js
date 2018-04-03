import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import {getClasses} from "testUtils";

import {AppLayout, styles} from './AppLayout';

const classes = getClasses(styles);
const makeComponent = (props) => shallow(<AppLayout classes={classes} {...props} />);

describe('AppLayout', () => {
    it('should render sidebar', () => {
        const component = <div>aaa</div>;
        const wrapper = makeComponent({sidebar: component});
        expect(wrapper.contains(component)).to.equal(true);
    });

    it('should render content', () => {
        const component = <div>aaa</div>;
        const wrapper = makeComponent({content: component});
        expect(wrapper.contains(component)).to.equal(true);
    });

    it('should render log', () => {
        const component = <div>aaa</div>;
        const wrapper = makeComponent({log: component});
        expect(wrapper.contains(component)).to.equal(true);
    });

    it('should render footer', () => {
        const component = <div>aaa</div>;
        const wrapper = makeComponent({footer: component});
        expect(wrapper.contains(component)).to.equal(true);
    });
});
