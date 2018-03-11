import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import i18n from "core/i18n";
import {number} from "core/util";
import resources from "core/resources";

const ResourceInner = ({
    current, max, displayName, isFull, onAdd, perSecond, msg,
}) => (
    <div title={number.formatFloat(current)}>
        <span>{displayName}: </span>
        <span>{number.formatInt(current)}/{number.formatInt(max)}</span>
        <span>({number.formatFloat(perSecond)}/{msg.secondShort})</span>
        &nbsp;<button disabled={isFull} onClick={onAdd}>+</button>
    </div>
);

ResourceInner.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    perSecond: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    isFull: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    msg: PropTypes.object.isRequired,
};

const getMessages = i18n.createGetMessages({
    secondShort: "unit.second.short",
});

const mapStateToProps = (state, {resource}) => ({
    current: resources.getCurrent(state, resource),
    max: resources.getMax(state, resource),
    isFull: resources.isFull(state, resource),
    perSecond: resources.getPerSecond(state, resource),
    displayName: i18n.getMessage(state, resource),
    msg: getMessages(state),
});

const mapDispatchToProps = (dispatch, {resource}) => ({
    onAdd: () => dispatch(resources.add(resource, 1)),
});

export const Resource = connect(mapStateToProps, mapDispatchToProps)(ResourceInner);

Resource.propTypes = {
    resource: PropTypes.string.isRequired,
};
