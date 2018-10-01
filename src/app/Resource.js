import React from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getResourceAmount, getResourceMax, addResource, getResourcePerSecond, isResourceAtMax} from "game";

export const Resource = ({resource, value, max, onAddQi, canAdd, perSec}) => (
    <div>
        <span>{value} / {max} ({perSec} /sec)</span>&nbsp;
        <button type="button" disabled={!canAdd} onClick={onAddQi}>add</button>&nbsp;
        <span>({resource})</span>
    </div>
);

Resource.propTypes = {
    resource: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    canAdd: PropTypes.bool.isRequired,
    onAddQi: PropTypes.func.isRequired,
    perSec: PropTypes.number.isRequired,
};

const mapStateToProps = (state, {resource}) => ({
    value: getResourceAmount(state, resource),
    max: getResourceMax(state, resource),
    perSec: getResourcePerSecond(state, resource),
    canAdd: !isResourceAtMax(state, resource),
});

const mapDispatchToProps = (dispatch, {resource}) => ({
    onAddQi: () => dispatch(addResource(resource)),
});

const ConnectedResource = connect(mapStateToProps, mapDispatchToProps)(Resource);

ConnectedResource.propTypes = {
    resource: PropTypes.string.isRequired,
};

export default ConnectedResource;
