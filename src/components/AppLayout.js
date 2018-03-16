import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

const styles = (theme) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
    },
    bottom: {
        flex: "1",
        display: "flex",
    },
    sidebar: {
        width: "200px",
        padding: theme.spacing.small,
    },
    content: {
        flex: "1",
        padding: theme.spacing.small,
    },
});

const ResourceStatus = ({sidebar, content, classes}) => (
    <div className={classes.container}>
        <div className={classes.sidebar}>
            {sidebar}
        </div>
        <div className={classes.content}>
            {content}
        </div>
    </div>
);

ResourceStatus.propTypes = {
    sidebar: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ResourceStatus);
