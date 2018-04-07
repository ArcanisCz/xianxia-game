import PropTypes from "prop-types";
import {connect} from "react-redux";

import i18n from "core/i18n";
import actions from "game/actions";

import {ButtonComponent} from "components";

const mapStateToProps = (state, {action}) => ({
    progress: actions.getProgress(state, action),
    canStart: actions.canStart(state, action),
    perSecond: actions.getPerSecond(state, action),
    text: i18n.getMessage(state, action),
});

const mapDispatchToProps = (dispatch, {action}) => ({
    onClick: () => dispatch(actions.startAction(action)),
});

const mergeProps = ({progress, canStart, perSecond, text}, {onClick}) => ({
    progress: progress ? 1 : 0,
    disabled: !canStart,
    perSecond,
    text,
    onClick,
});

export const ActionButton = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ButtonComponent);

ActionButton.propTypes = {
    action: PropTypes.string.isRequired,
};
