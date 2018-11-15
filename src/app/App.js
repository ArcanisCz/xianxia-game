import {h} from 'preact';
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {connect} from "preact-redux";

import init from "core/init";
import {
    RESOURCES,
    TECHNIQUES,
    getVisibleResources,
    getVisibleTechniques,
} from "game";

import Resource from "./Resource";
import Technique from "./Technique";
import {ComponentShowcase} from "./ComponentShowcase";

import style from "./pokus.scss";
import Meditate from "./Meditate";

const App = ({loading, resources, techniques}) => !loading && (
    <div className={style.display}>
        {resources.map((resource) => (
            <>
                <Resource resource={resource} />
                <hr />
            </>
        )).toJS()}
        <Meditate />
        <hr />
        {techniques.map((technique) => (
            <>
                <Technique technique={technique} />
                <hr />
            </>
        )).toJS()}
        <ComponentShowcase />
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
