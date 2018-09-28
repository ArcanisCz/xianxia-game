import {h} from 'preact';

import PropTypes from "prop-types";
import {connect} from "preact-redux";

import {
    getBasicTechniqueLevel,
    levelUpBasicTechnique,
    canLevelUpBasicTechnique,
    getBasicTechniqueLevelUpPrice,
} from "game";

const BasicTechnique = ({level, price, onLevelUp, canLevelUp}) => (
    <button title={price} type="button" disabled={!canLevelUp} onClick={onLevelUp}>Basic Technique ({level})</button>
);

BasicTechnique.propTypes = {
    level: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    canLevelUp: PropTypes.bool.isRequired,
    onLevelUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    level: getBasicTechniqueLevel(state),
    canLevelUp: canLevelUpBasicTechnique(state),
    price: getBasicTechniqueLevelUpPrice(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLevelUp: () => dispatch(levelUpBasicTechnique()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicTechnique);
