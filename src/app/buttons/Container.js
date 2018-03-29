import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ButtonComponent} from "components";
import actions from "game/actions";

const Container = ({onMeditate, meditateProgress, meditateCanStart}) => (
    <div>
        <ButtonComponent text="Meditate" onClick={onMeditate} progress={meditateProgress} disabled={!meditateCanStart} />
    </div>
);

Container.propTypes = {
    meditateProgress: PropTypes.number,
    meditateCanStart: PropTypes.bool.isRequired,
    onMeditate: PropTypes.func.isRequired,
};

Container.defaultProps = {
    meditateProgress: null,
};

const mapStateToProps = (state) => ({
    meditateProgress: actions.getProgress(state, actions.MEDITATE),
    meditateCanStart: actions.canStart(state, actions.MEDITATE),
});

const mapDispatchToProps = (dispatch) => ({
    onMeditate: () => dispatch(actions.startAction(actions.MEDITATE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
