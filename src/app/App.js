import {h} from 'preact';

import PropTypes from "prop-types";
import {connect} from "preact-redux";

import init from "core/init";

const App = ({loading}) => !loading && <div>game</div>;

App.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
});

const Connected = connect(mapStateToProps)(App);

export default Connected;

