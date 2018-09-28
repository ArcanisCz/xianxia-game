import React from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
    getTechniqueLevel,
    levelTechnique,
    canLevelUpTechnique,
    // getTechniqueLevelUpPrice,
} from "game";

const Technique = ({technique, level, onLevelUp, canLevelUp}) => (
    <div>
        {technique} ({level})
        <button type="button" disabled={!canLevelUp} onClick={onLevelUp}>Level up</button>
        Price: XXX
    </div>
);

Technique.propTypes = {
    technique: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    // price: PropTypes.number.isRequired,
    canLevelUp: PropTypes.bool.isRequired,
    onLevelUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {technique}) => ({
    level: getTechniqueLevel(state, technique),
    canLevelUp: canLevelUpTechnique(state, technique),
    // price: getTechniqueLevelUpPrice(state, technique),
});

const mapDispatchToProps = (dispatch, {technique}) => ({
    onLevelUp: () => dispatch(levelTechnique(technique)),
});

const ConnectedTechnique = connect(mapStateToProps, mapDispatchToProps)(Technique);

ConnectedTechnique.propTypes = {
    technique: PropTypes.string.isRequired,
};

export default ConnectedTechnique;
