import React from "react";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";

import resources from "core/resources";

import {Resource} from "./Resource";

const Container = ({visibleResources}) => (
    <div>
        {visibleResources.map((resource) => (
            <Resource key={resource} resource={resource} />
        ))}
    </div>
);

Container.propTypes = {
    visibleResources: IPropTypes.listOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
    visibleResources: resources.getVisibleResources(state),
});

export default connect(mapStateToProps)(Container);

