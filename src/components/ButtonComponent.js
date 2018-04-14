import React, {Component} from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';
import classnames from "classnames";

import Tooltip from "./tooltip/Tooltip";

export const styles = (theme) => ({
    root: {
        display: "inline-block",
    },
    block: {
        display: "flex",
        textAlign: "center",
    },
    buttonBasic: {
        display: "inline-block",
        position: "relative",
        backgroundColor: theme.color.white,
        border: `1px solid ${theme.color.greyBorder}`,
        cursor: "pointer",
        padding: theme.spacing.small,
        userSelect: "none",
        transition: `all ${theme.transition.standard}ms ${theme.easing.easeInOut}`,
        "&:hover": {
            borderColor: theme.color.black,
            zIndex: 1,
        },
    },
    button: {
        flex: 1,
    },
    levelUpButton: {
        left: "-1px",
    },
    disabled: {
        backgroundColor: theme.color.lightgrey,
        borderColor: theme.color.greyBorder,
        color: theme.color.grey,
        cursor: "default",
        "&:hover": {
            borderColor: theme.color.greyBorder,
        },
    },
    text: {
        zIndex: 2,
        position: "relative",
        textTransform: "capitalize",
    },
    progress: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        background: theme.color.green,
        zIndex: 1,
        transition: ({perSecond, progress}) => `width ${!progress ? 0 : ((1 / perSecond) - 0.2)}s linear`,
    },
});

/**
 * Inline block element of clickable button with text. Can also be disabled and have progressbar on background.
 */

export class ButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTooltipForButton: false,
            showTooltipForUpgrade: false,
            x: null,
            y: null,
        };

        this.showTooltipForButton = this.showTooltipForButton.bind(this);
        this.showTooltipForUpgrade = this.showTooltipForUpgrade.bind(this);
    }

    showTooltipForButton(show) {
        const rect = this.buttonElement.getBoundingClientRect();
        this.setState({
            showTooltipForButton: show,
            showTooltipForUpgrade: false,
            x: rect.right,
            y: rect.top,
        });
    }

    showTooltipForUpgrade(show) {
        const rect = this.upgradeElement.getBoundingClientRect();
        this.setState({
            showTooltipForButton: false,
            showTooltipForUpgrade: show,
            x: rect.right,
            y: rect.top,
        });
    }

    render() {
        const {
            text,
            onClick,
            disabled,
            block,
            classes,
            progress,
            onLevelUp,
            levelUpDisabled,
            buttonTooltip,
            upgradeTooltip,
        } = this.props;
        return (
            <div
                className={classnames(classes.root, {
                    [classes.block]: block,
                })}
            >
                <div
                    ref={(el) => this.buttonElement = el} // eslint-disable-line no-return-assign
                    onMouseEnter={() => this.showTooltipForButton(true)}
                    onMouseLeave={() => this.showTooltipForButton(false)}
                    onClick={disabled ? undefined : onClick}
                    className={classnames(classes.buttonBasic, classes.button, {
                        [classes.disabled]: disabled,
                    })}
                >
                    <span className={classes.text}>{text}</span>
                    <div
                        className={classes.progress}
                        style={{width: `${progress ? 100 : 0}%`}}
                    />
                </div>
                {onLevelUp && (
                    <div
                        ref={(el) => this.upgradeElement = el} // eslint-disable-line no-return-assign
                        onMouseEnter={() => this.showTooltipForUpgrade(true)}
                        onMouseLeave={() => this.showTooltipForUpgrade(false)}
                        onClick={levelUpDisabled ? undefined : onLevelUp}
                        className={classnames(classes.buttonBasic, classes.levelUpButton, {
                            [classes.disabled]: levelUpDisabled,
                        })}
                    >
                        +
                    </div>
                )}
                {buttonTooltip && this.state.showTooltipForButton && (
                    <Tooltip x={this.state.x} y={this.state.y}>{buttonTooltip}</Tooltip>
                )}
                {upgradeTooltip && this.state.showTooltipForUpgrade && (
                    <Tooltip x={this.state.x} y={this.state.y}>{upgradeTooltip}</Tooltip>
                )}
            </div>
        );
    }
}

ButtonComponent.propTypes = {
    classes: PropTypes.object,
    /** Text of button. */
    text: PropTypes.string.isRequired,
    /** Button click. */
    onClick: PropTypes.func.isRequired,
    onLevelUp: PropTypes.func,
    levelUpDisabled: PropTypes.bool,
    /** Will render button disabled, not able to click and greyed. */
    disabled: PropTypes.bool,
    /** Will show progress on background in interval. Current implementation only triggers animation based on 0/1 values and perSecond */
    progress: PropTypes.bool,
    /** Used for computing animation */
    perSecond: PropTypes.number, // eslint-disable-line
    /** Will make button block element */
    block: PropTypes.bool,
    buttonTooltip: PropTypes.node,
    upgradeTooltip: PropTypes.node,
};

ButtonComponent.defaultProps = {
    onLevelUp: null,
    disabled: false,
    levelUpDisabled: false,
    progress: false,
    perSecond: 0,
    block: false,
    classes: {},
    buttonTooltip: null,
    upgradeTooltip: null,
};

export default injectSheet(styles)(ButtonComponent);
