import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";

import init from "core/init";
import {
    RESOURCES,
    TECHNIQUES,
    getVisibleResources,
    getVisibleTechniques,
} from "game";

import Resource from "./Resource";
import Technique from "./Technique";

import Meditate from "./Meditate";

const App = ({loading, resources, techniques}) => (
    <div>
        Layout TODO
        {!loading && (
            <div>
                {resources.toJS().map((resource) => (
                    <Fragment key={resource}>
                        <Resource resource={resource} />
                        <hr />
                    </Fragment>
                ))}
                <Meditate />
                <hr />
                {techniques.toJS().map((technique) => (
                    <Fragment key={technique}>
                        <Technique technique={technique} />
                        <hr />
                    </Fragment>
                ))}
            </div>
        )}
    </div>
);

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    resources: IPropTypes.listOf(PropTypes.oneOf(RESOURCES)),
    techniques: IPropTypes.listOf(PropTypes.oneOf(TECHNIQUES)),
};

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
    resources: getVisibleResources(state),
    techniques: getVisibleTechniques(state),
});

export default connect(mapStateToProps)(App);
