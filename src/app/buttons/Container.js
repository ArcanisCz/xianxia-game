import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ButtonComponent, SectionLayout} from "components";
import actions from "game/actions";

const Container = ({onMeditate, meditateProgress, meditateCanStart, meditatePerSecond}) => (
    <SectionLayout>
        <ButtonComponent
            text="Meditate"
            onClick={onMeditate}
            progress={meditateProgress ? 1 : 0}
            perSecond={meditatePerSecond}
            disabled={!meditateCanStart}
        />
    </SectionLayout>
);

Container.propTypes = {
    meditateProgress: PropTypes.number,
    meditateCanStart: PropTypes.bool.isRequired,
    onMeditate: PropTypes.func.isRequired,
    meditatePerSecond: PropTypes.number.isRequired,
};

Container.defaultProps = {
    meditateProgress: null,
};

const mapStateToProps = (state) => ({
    meditateProgress: actions.getProgress(state, actions.MEDITATE),
    meditateCanStart: actions.canStart(state, actions.MEDITATE),
    meditatePerSecond: actions.getPerSecond(state, actions.MEDITATE),
});

const mapDispatchToProps = (dispatch) => ({
    onMeditate: () => dispatch(actions.startAction(actions.MEDITATE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
