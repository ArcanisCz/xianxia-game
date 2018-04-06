import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

export const styles = (theme) => ({
    container: {
        margin: theme.spacing.small,
    },
});

export const SectionLayout = ({children, classes}) => (
    <div className={classes.container}>
        {children}
    </div>
);

SectionLayout.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

SectionLayout.defaultProps = {
    children: null,
};

export default injectSheet(styles)(SectionLayout);
