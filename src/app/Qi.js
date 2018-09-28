import {h} from 'preact';

import PropTypes from "prop-types";
import {connect} from "preact-redux";

import {getQi, getMaxQi, addQi} from "game";

const Qi = ({value, max, onAddQi, canAdd}) => (
    <div>
        <div>{value} / {max}</div>
        <button type="button" disabled={!canAdd} onClick={onAddQi}>add</button>
    </div>
);

Qi.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    canAdd: PropTypes.bool.isRequired,
    onAddQi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const value = getQi(state);
    const max = getMaxQi(state);
    return {
        value,
        max,
        canAdd: value < max,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onAddQi: () => dispatch(addQi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Qi);
