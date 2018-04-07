import PropTypes from "prop-types";
import {connect} from "react-redux";

import i18n from "core/i18n";
import actions from "game/actions";

import {ButtonComponent} from "components";

const mapStateToProps = (state, {action}) => ({
    progress: actions.getProgress(state, action),
    canStart: actions.canStart(state, action),
    perSecond: actions.getPerSecond(state, action),
    level: actions.getLevel(state, action),
    text: i18n.getMessage(state, action),
});

const mapDispatchToProps = (dispatch, {action}) => ({
    onClick: (immediate) => dispatch(actions.start(action, immediate)),
});

const mergeProps = ({progress, canStart, perSecond, text, level}, {onClick}) => ({
    progress: progress != null ? 1 : 0,
    disabled: !canStart,
    perSecond,
    // text: `${text} (${level})`, // TODO future
    text,
    onClick: () => onClick(perSecond === Infinity),
    // onUpgrade: () => console.log("aa"), // TODO future
    // upgradeDisabled: false, // TODO future
});

export const ActionButton = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ButtonComponent);

ActionButton.propTypes = {
    action: PropTypes.string.isRequired,
};
