import React from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";

import {canMeditate, meditate} from "game";
import {Button} from "components/atoms";

export const Meditate = ({disabled, onClick}) => (
    <Button onClick={onClick} text="Meditate" disabled={disabled} />
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
