import {h} from 'preact';

import PropTypes from "prop-types";
import {connect} from "preact-redux";

import init from "core/init";

import Qi from "./Qi";
import BasicTechnique from "./BasicTechnique";

const App = ({loading}) => !loading && (
    <div>
        <Qi />
        <BasicTechnique />
    </div>
);

App.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
});

export default connect(mapStateToProps)(App);
