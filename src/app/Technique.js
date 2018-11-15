import {h} from 'preact';

import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {connect} from "preact-redux";

import {
    getTechniqueLevel,
    levelTechnique,
    createTechniqueCanLevel,
    createTechniqueLevelPrice,
    RESOURCES,
} from "game";

const Technique = ({technique, level, onLevelUp, canLevelUp, prices}) => (
    <div>
        {technique} ({level})&nbsp;
        <button type="button" disabled={!canLevelUp} onClick={onLevelUp}>Level up</button>
        {/* eslint-disable react/no-array-index-key */}
        {/* immutable map's second argument is key, not index */}
        {prices.map((price, resource) => (
            <div key={resource}>{resource}: {price}</div>
        )).toList().toArray()}
        {/* eslint-enable */}
    </div>
);

Technique.propTypes = {
    technique: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    prices: IPropTypes.mapOf(PropTypes.number, PropTypes.oneOf(RESOURCES)).isRequired,
    canLevelUp: PropTypes.bool.isRequired,
    onLevelUp: PropTypes.func.isRequired,
};

const createMapStateToProps = () => {
    const canLevel = createTechniqueCanLevel();
    const getLevelPrice = createTechniqueLevelPrice();
    return (state, {technique}) => ({
        level: getTechniqueLevel(state, technique),
        canLevelUp: canLevel(state, technique),
        prices: getLevelPrice(state, technique),
    });
};

const mapDispatchToProps = (dispatch, {technique}) => ({
    onLevelUp: () => dispatch(levelTechnique(technique)),
});

const ConnectedTechnique = connect(createMapStateToProps, mapDispatchToProps)(Technique);

ConnectedTechnique.propTypes = {
    technique: PropTypes.string.isRequired,
};

export default ConnectedTechnique;
