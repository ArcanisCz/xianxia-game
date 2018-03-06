import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import resources from "core/resources";

const ResourceInner = ({
    current, max, resource, isFull, onAdd,
}) => (
    <div>
        {resource}: {current}/{max}
        {!isFull && <button onClick={onAdd}>Add</button>}
    </div>
);

ResourceInner.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    isFull: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {resource}) => ({
    current: resources.getCurrent(state, resource),
    max: resources.getMax(state, resource),
    isFull: resources.isFull(state, resource),
});

const mapDispatchToProps = (dispatch, {resource}) => ({
    onAdd: () => dispatch(resources.add(resource, 2)),
});

export const Resource = connect(mapStateToProps, mapDispatchToProps)(ResourceInner);

Resource.propTypes = {
    resource: PropTypes.string.isRequired,
};
