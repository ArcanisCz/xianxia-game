import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import i18n from "core/i18n";
import actions from "game/actions";

import {ButtonComponent} from "components";

import ActionTooltip from "./ActionTooltip";
import ActionUpgradeTooltip from "./ActionUpgradeTooltip";

const mapStateToProps = (state, {action}) => ({
    progress: actions.getProgress(state, action),
    canStart: actions.canStart(state, action),
    perSecond: actions.getPerSecond(state, action),
    level: actions.getLevel(state, action),
    canLevelUp: actions.canLevelUp(state, action),
    text: i18n.getMessage(state, action),
});

const mapDispatchToProps = (dispatch, {action}) => ({
    onClick: (immediate) => dispatch(actions.start(action, immediate)),
    onLevelUp: () => dispatch(actions.levelUp(action)),
});

const mergeProps = ({progress, canStart, perSecond, text, level, canLevelUp}, {onClick, onLevelUp}, {action}) => ({
    progress,
    disabled: !canStart,
    perSecond,
    text: level ? `${text} (${level})` : text,
    onClick: () => onClick(perSecond === Infinity),
    onLevelUp,
    levelUpDisabled: !canLevelUp,
    buttonTooltip: <ActionTooltip action={action} />,
    upgradeTooltip: <ActionUpgradeTooltip action={action} />,
});

export const ActionButton = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ButtonComponent);

ActionButton.propTypes = {
    action: PropTypes.string.isRequired,
};
