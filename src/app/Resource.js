import React from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getResourceAmount, getResourceMax, addResource} from "game";

const Resource = ({resource, value, max, onAddQi, canAdd}) => (
    <div>
        <span>{value} / {max}</span>&nbsp;
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
};

const mapStateToProps = (state, {resource}) => {
    const value = getResourceAmount(state, resource);
    const max = getResourceMax(state, resource);
    return {
        value,
        max,
        canAdd: value < max,
    };
};

const mapDispatchToProps = (dispatch, {resource}) => ({
    onAddQi: () => dispatch(addResource(resource)),
});

const ConnectedResource = connect(mapStateToProps, mapDispatchToProps)(Resource);

ConnectedResource.propTypes = {
    resource: PropTypes.string.isRequired,
};

export default ConnectedResource;
