import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

const styles = (theme) => ({
    container: {
        background: theme.color.white,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    top: {
        flex: "1",
        display: "flex",
    },
    bottom: {
        height: "25px",
        borderTop: `1px solid ${theme.color.greyBorder}`,
    },
    sidebar: {
        width: "250px",
        borderRight: `1px solid ${theme.color.greyBorder}`,
        padding: theme.spacing.small,
    },
    content: {
        flex: "1",
        padding: theme.spacing.small,
    },
    log: {
        borderLeft: `1px solid ${theme.color.greyBorder}`,
        width: "300px",
        padding: theme.spacing.small,
        overflowY: "auto",
        fontSize: theme.font.small,
    },
});

const AppLayout = ({sidebar, content, log, footer, classes, loading}) => !loading && (
    <div className={classes.container}>
        <div className={classes.top}>
            <div className={classes.sidebar}>
                {sidebar}
            </div>
            <div className={classes.content}>
                {content}
            </div>
            <div className={classes.log}>
                {log}
            </div>
        </div>
        <div className={classes.bottom}>
            {footer}
        </div>
    </div>
);

AppLayout.propTypes = {
    sidebar: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    log: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

AppLayout.defaultProps = {
    loading: false,
};

export default injectSheet(styles)(AppLayout);
