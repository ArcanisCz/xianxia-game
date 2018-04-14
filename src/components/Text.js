import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

export const styles = (theme) => ({
    root: {
        color: ({grey}) => (grey ? theme.color.grey : theme.color.black),
    },
});

const Text = ({children, classes}) => (
    <span className={classes.root}>{children}</span>
);

Text.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Text);
