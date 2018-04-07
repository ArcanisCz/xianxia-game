import React, {Fragment} from "react";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";

import {SectionLayout} from "components";
import resources from "game/resources";

import {Resource} from "./Resource";

const Container = ({mainResources, secondaryResources}) => (
    <Fragment>
        <SectionLayout>
            {mainResources.map((resource) => (
                <Resource key={resource} resource={resource} />
            ))}
        </SectionLayout>
        <SectionLayout>
            {secondaryResources.map((resource) => (
                <Resource key={resource} resource={resource} />
            ))}
        </SectionLayout>
    </Fragment>
);

Container.propTypes = {
    mainResources: IPropTypes.listOf(PropTypes.string).isRequired,
    secondaryResources: IPropTypes.listOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
    mainResources: resources.getMainResources(state),
    secondaryResources: resources.getSecondaryResources(state),
});

export default connect(mapStateToProps)(Container);

