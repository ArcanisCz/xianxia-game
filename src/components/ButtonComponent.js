import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';
import classnames from "classnames";

export const styles = (theme) => ({
    root: {
        position: "relative",
        backgroundColor: theme.color.white,
        border: `1px solid ${theme.color.greyBorder}`,
        display: "inline-block",
        cursor: "pointer",
        padding: theme.spacing.small,
        userSelect: "none",
        transition: `all ${theme.transition.normal} ease`,
        "&:hover": {
            borderColor: theme.color.black,
        },
    },
    block: {
        display: "block",
        textAlign: "center",
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
export const ButtonComponent = ({text, onClick, disabled, block, classes, progress}) => (
    <div
        className={classnames(classes.root, {
            [classes.disabled]: disabled,
            [classes.block]: block,
        })}
        onClick={disabled ? undefined : onClick}
    >
        <span className={classes.text}>{text}</span>
        <div
            className={classes.progress}
            style={{width: `${progress * 100}%`}}
        />
    </div>
);

ButtonComponent.propTypes = {
    classes: PropTypes.object,
    /** Text of button. */
    text: PropTypes.string.isRequired,
    /** Button click. */
    onClick: PropTypes.func.isRequired,
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
    disabled: false,
    progress: 0,
    perSecond: 0,
    block: false,
    classes: {},
};

export default injectSheet(styles)(ButtonComponent);
