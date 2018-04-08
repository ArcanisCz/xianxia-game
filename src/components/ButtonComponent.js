import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';
import classnames from "classnames";

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
    upgradeButton: {
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
        transition: ({perSecond, progress}) => `width ${progress === 0 ? 0.1 : (1 / perSecond)}s linear`,
    },
});

/**
 * Inline block element of clickable button with text. Can also be disabled and have progressbar on background.
 */
export const ButtonComponent = ({text, onClick, disabled, block, classes, progress, onUpgrade, upgradeDisabled}) => (
    <div
        className={classnames(classes.root, {
            [classes.block]: block,
        })}
    >
        <div
            onClick={disabled ? undefined : onClick}
            className={classnames(classes.buttonBasic, classes.button, {
                [classes.disabled]: disabled,
            })}
        >
            <span className={classes.text}>{text}</span>
            <div
                className={classes.progress}
                style={{width: `${progress * 100}%`}}
            />
        </div>
        {onUpgrade && (
            <div
                onClick={disabled ? undefined : onUpgrade}
                className={classnames(classes.buttonBasic, classes.upgradeButton, {
                    [classes.disabled]: upgradeDisabled,
                })}
            >
                +
            </div>
        )}
    </div>
);

ButtonComponent.propTypes = {
    classes: PropTypes.object,
    /** Text of button. */
    text: PropTypes.string.isRequired,
    /** Button click. */
    onClick: PropTypes.func.isRequired,
    onUpgrade: PropTypes.func,
    upgradeDisabled: PropTypes.bool,
    /** Will render button disabled, not able to click and greyed. */
    disabled: PropTypes.bool,
    /** Will show progress on background in interval. Current implementation only triggers animation based on 0/1 values and perSecond */
    progress: PropTypes.oneOf([0, 1]),
    /** Used for computing animation */
    perSecond: PropTypes.number, // eslint-disable-line
    /** Will make button block element */
    block: PropTypes.bool,
};

ButtonComponent.defaultProps = {
    onUpgrade: null,
    disabled: false,
    upgradeDisabled: false,
    progress: 0,
    perSecond: 0,
    block: false,
    classes: {},
};

export default injectSheet(styles)(ButtonComponent);
