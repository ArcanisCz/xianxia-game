import {h} from 'preact';

import PropTypes from "prop-types";
import {connect} from "preact-redux";

import init from "core/init";
import {RESOURCES, TECHNIQUES} from "game";

import Resource from "./Resource";
import Technique from "./Technique";

const App = ({loading}) => !loading && (
    <div>
        {RESOURCES.map((resource) => (
            <Resource resource={resource} />
        ))}
        {TECHNIQUES.map((technique) => (
            <Technique technique={technique} />
        ))}
    </div>
);

App.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
});

export default connect(mapStateToProps)(App);
