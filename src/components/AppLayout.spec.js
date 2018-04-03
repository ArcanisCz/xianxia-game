import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import {getClasses} from "testUtils";

import {AppLayout, styles} from './AppLayout';

const divs = {
    content: <div>content</div>,
    energy: <div>energy</div>,
    footer: <div>footer</div>,
    info: <div>info</div>,
    sidebar: <div>sidebar</div>,
    tabs: <div>tabs</div>,
};

const classes = getClasses(styles);
const makeComponent = (props) => shallow((
    <AppLayout
        content={divs.content}
        energy={divs.energy}
        footer={divs.footer}
        info={divs.info}
        sidebar={divs.sidebar}
        tabs={divs.tabs}
        classes={classes}
        {...props}
    />
));

describe('AppLayout', () => {
    Object.keys(divs).forEach((name) => {
        it(`should correctly render ${name}`, () => {
            const wrapper = makeComponent();
            expect(wrapper.contains(divs[name])).eq(true);
        });
    });

    it("should return empty when loading", () => {
        const wrapper = makeComponent({loading: true});
        expect(wrapper.html()).eq(null);
    });
});
