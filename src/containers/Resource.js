import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {number} from "core/util";
import resources from "core/resources";

const ResourceInner = ({
    current, max, resource, isFull, onAdd, perSecond,
}) => (
    <div title={number.formatFloat(current)}>
        {resource}:
        &nbsp;{number.formatFloat(current)}/{number.formatInt(max)}
        &nbsp;({number.formatFloat(perSecond)}/s)
        &nbsp;<button disabled={isFull} onClick={onAdd}>+</button>
    </div>
);

ResourceInner.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    perSecond: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    isFull: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {resource}) => ({
    current: resources.getCurrent(state, resource),
    max: resources.getMax(state, resource),
    isFull: resources.isFull(state, resource),
    perSecond: resources.getPerSecond(state, resource),
});

const mapDispatchToProps = (dispatch, {resource}) => ({
    onAdd: () => dispatch(resources.add(resource, 1)),
});

export const Resource = connect(mapStateToProps, mapDispatchToProps)(ResourceInner);

Resource.propTypes = {
    resource: PropTypes.string.isRequired,
};
