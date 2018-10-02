import React, {Fragment} from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";

import init from "core/init";
import {RESOURCES, TECHNIQUES} from "game";

import Resource from "./Resource";
import Technique from "./Technique";

import style from "./pokus.scss";

const App = ({loading}) => !loading && (
    <div className={style.display}>
        {RESOURCES.map((resource) => (
            <Fragment key={resource}>
                <Resource resource={resource} />
                <hr />
            </Fragment>
        ))}
        {TECHNIQUES.map((technique) => (
            <Fragment key={technique}>
                <Technique technique={technique} />
                <hr />
            </Fragment>
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
