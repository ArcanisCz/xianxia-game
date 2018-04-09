import React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

export const styles = (theme) => ({
    tooltip: {
        border: `1px solid ${theme.color.black}`,
        background: theme.color.white,
        position: "absolute",
        width: "200px",
        zIndex: 1000,
        top: ({y}) => `${y}px`,
        left: ({x}) => `${x + 2}px`,
    },
});

const Tooltip = ({children, classes}) => {
    const tooltip = (
        <div className={classes.tooltip}>
            {children}
        </div>
    );
    return createPortal(tooltip, document.body);
};

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

Tooltip.defaultProps = {
    classes: {},
};

export default injectSheet(styles)(Tooltip);
