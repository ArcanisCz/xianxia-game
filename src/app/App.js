import {h} from 'preact';

import PropTypes from "prop-types";
import {connect} from "preact-redux";

import init from "core/init";

import Qi from "./Qi";

const App = ({loading}) => !loading && <Qi />;

App.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
});

export default connect(mapStateToProps)(App);

