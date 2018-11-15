import {h} from 'preact';

import PropTypes from "prop-types";
import {connect} from "preact-redux";

import {canMeditate, meditate} from "game";

export const Meditate = ({disabled, onClick}) => (
    <button type='button' disabled={disabled} onClick={onClick}>Meditate</button>
);

Meditate.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    disabled: !canMeditate(state),
});

const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(meditate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meditate);
