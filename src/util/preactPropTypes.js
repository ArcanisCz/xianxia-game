/* eslint-disable */
/**
 * Custom implementation that enables PropTypes checks in preact
 *
 * Based on:
 * - https://github.com/developit/preact-compat
 * - https://github.com/developit/preact/issues/902#issuecomment-334507942
 */

import {options, Component} from 'preact';
import PropTypes from 'prop-types';

const COMPONENT_WRAPPER_KEY = '__preactCompatWrapper';

function patchWithPropTypes(vnode) {
    if (!vnode.preactCompatNormalized) {
        normalizeVNode(vnode);
    }

    const PatchingComponent = vnode.nodeName;
    const name = PatchingComponent.displayName || PatchingComponent.name || 'component';
    const render = PatchingComponent.prototype.render;

    PatchingComponent.__patchedWithPropTypes = true;

    if (render) {
        PatchingComponent.prototype.render = function renderWithPropTypes(props, state, ctx) {
            if (PatchingComponent.propTypes) {
                PropTypes.checkPropTypes(PatchingComponent.propTypes, props, 'prop', name);
            }
            return render.call(this, props, state, ctx);
        };
    }
}

function normalizeVNode(vnode) {
    vnode.preactCompatNormalized = true;

    if (isStatelessComponent(vnode.nodeName)) {
        vnode.nodeName = statelessComponentHook(vnode.nodeName);
    }

    return vnode;
}

function statelessComponentHook(Ctor) {
    let Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
    if (Wrapped) return Wrapped === true ? Ctor : Wrapped;

    Wrapped = wrapStatelessComponent(Ctor);

    Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, {configurable: true, value: true});
    Wrapped.displayName = Ctor.displayName;
    Wrapped.propTypes = Ctor.propTypes;
    Wrapped.defaultProps = Ctor.defaultProps;
    Wrapped.__docgenInfo = Ctor.__docgenInfo;

    Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, {configurable: true, value: Wrapped});

    return Wrapped;
}

function isStatelessComponent(c) {
    return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

function wrapStatelessComponent(wrappedComponent) {
    class NewComponent extends Component {
        render() {
            return wrappedComponent(this.props, this.context);
        }
    }

    return NewComponent;
}

const nextVnode = options.vnode;
options.vnode = (vnode) => {
    if (typeof vnode.nodeName === 'function' && !vnode.nodeName.__patchedWithPropTypes) {
        patchWithPropTypes(vnode);
    }
    if (nextVnode) {
        nextVnode(vnode);
    }
};
