import React from 'react';
import PropTypes from "prop-types";
import {hot} from 'react-hot-loader';
import {connect} from "react-redux";

import init from "core/init";

const App = ({loading}) => !loading && <div>game</div>;

App.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
});

const Connected = connect(mapStateToProps)(App);
const Hot = hot(module)(Connected);

export default Hot;

