import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Button} from "components";
import actions from "core/actions";

const Buttons = ({onMeditate, meditateProgress, meditateCanStart}) => (
    <div>
        <Button text="Meditate" onClick={onMeditate} progress={meditateProgress} disabled={!meditateCanStart} />
    </div>
);

Buttons.propTypes = {
    meditateProgress: PropTypes.number,
    meditateCanStart: PropTypes.bool.isRequired,
    onMeditate: PropTypes.func.isRequired,
};

Buttons.defaultProps = {
    meditateProgress: null,
};

const mapStateToProps = (state) => ({
    meditateProgress: actions.getProgress(state, actions.MEDITATE),
    meditateCanStart: actions.canStart(state, actions.MEDITATE),
});

const mapDispatchToProps = (dispatch) => ({
    onMeditate: () => dispatch(actions.startAction(actions.MEDITATE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
