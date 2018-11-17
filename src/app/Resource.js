import React from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getResourceAmount, getResourceMax, getResourcePerSecond} from "game";

export const Resource = ({resource, value, max, perSec}) => (
    <div>
        <span>{value} / {max} ({perSec} /sec)</span>&nbsp;
        <span>({resource})</span>
    </div>
);

Resource.propTypes = {
    resource: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    perSec: PropTypes.number.isRequired,
};

const mapStateToProps = (state, {resource}) => ({
    value: getResourceAmount(state, resource),
    max: getResourceMax(state, resource),
    perSec: getResourcePerSecond(state, resource),
});

const ConnectedResource = connect(mapStateToProps)(Resource);

ConnectedResource.propTypes = {
    resource: PropTypes.string.isRequired,
};

export default ConnectedResource;
