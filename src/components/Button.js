import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';
import classnames from "classnames";

const styles = (theme) => ({
    root: {
        position: "relative",
        backgroundColor: theme.color.white,
        border: `1px solid ${theme.color.black}`,
        display: "inline-block",
        cursor: "pointer",
        padding: theme.spacing.small,
        userSelect: "none",
        transition: `all ${theme.transition.normal} ease`,
        "&:hover": {
            backgroundColor: theme.color.lightgrey,
        },
    },
    block: {
        display: "block",
        textAlign: "center",
    },
    disabled: {
        backgroundColor: theme.color.lightgrey,
        borderColor: theme.color.grey,
        color: theme.color.grey,
        cursor: "default",
        "&:hover": {
            background: theme.color.lightgrey,
        },
    },
    text: {
        zIndex: 2,
        position: "relative",
    },
    progress: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: ({progress}) => `${Math.min(progress, 1) * 100}%`,
        background: theme.color.green,
        zIndex: 1,
        transition: `width ${theme.transition.fast} ease`,
    },
});

/**
 * Inline block element of clickable button with text. Can also be disabled and have progressbar on background.
 */
const Button = ({text, onClick, disabled, block, classes}) => (
    <div
        className={classnames(classes.root, {
            [classes.disabled]: disabled,
            [classes.block]: block,
        })}
        onClick={disabled ? undefined : onClick}
        onKeyDown={onClick}
    >
        <span className={classes.text}>{text}</span>
        <div className={classes.progress} />
    </div>
);

Button.propTypes = {
    classes: PropTypes.object.isRequired,
    /** Text of button. */
    text: PropTypes.string.isRequired,
    /** Button click. */
    onClick: PropTypes.func.isRequired,
    /** Will render button disabled, not able to click and greyed. */
    disabled: PropTypes.bool,
    /** Will show progress on background in interval <0, 1>. */
    progress: PropTypes.number, // eslint-disable-line
    /** Will make button block element */
    block: PropTypes.bool,
};

Button.defaultProps = {
    disabled: false,
    progress: 0,
    block: false,
};

export default injectSheet(styles)(Button);
