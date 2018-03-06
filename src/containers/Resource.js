import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import resources from "core/resources";

const ResourceInner = ({current, max, name}) => (
    <div>
        {name}: {current}/{max}
    </div>
);

const mapStateToProps = (state, {name}) => ({
    current: resources.getCurrent(state, name),
    max: resources.getMax(state, name),
});

export const Resource = connect(mapStateToProps)(ResourceInner);

Resource.propTypes = {
    name: PropTypes.string.isRequired,
};
