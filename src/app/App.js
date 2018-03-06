import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {Resource} from "containers";
import resources from "core/resources";

import pokus from './pokus';

const App = ({count, onAdd}) => (
    <div>
        <Resource name={resources.QI} />
    </div>
);

App.propTypes = {
    count: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    count: pokus.getCount(state),
});

const mapDispatchToProps = (dispatch) => ({
    onAdd: () => dispatch(pokus.add()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
