import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

export const styles = (theme) => ({
    container: {
        background: theme.color.white,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    top: {
        display: "flex",
    },
    middle: {
        flex: "1",
        display: "flex",
        flexDirection: "row",
        borderTop: `1px solid ${theme.color.greyBorder}`,
        borderBottom: `1px solid ${theme.color.greyBorder}`,
    },
    bottom: {
        // TODO
    },
    info: {
        width: "250px",
        borderRight: `1px solid ${theme.color.greyBorder}`,
    },
    energy: {
        flex: 1,
    },
    sidebar: {
        width: "250px",
        borderRight: `1px solid ${theme.color.greyBorder}`,
    },
    contentArea: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
    },
    tabs: {
        borderBottom: `1px solid ${theme.color.greyBorder}`,
    },
    content: {
        flex: 1,
    },
});

export const AppLayout = ({info, energy, sidebar, tabs, content, footer, classes, loading}) => !loading && (
    <div className={classes.container}>
        <div className={classes.top}>
            <div className={classes.info}>{info}</div>
            <div className={classes.energy}>{energy}</div>
        </div>
        <div className={classes.middle}>
            <div className={classes.sidebar}>{sidebar}</div>
            <div className={classes.contentArea}>
                <div className={classes.tabs}>{tabs}</div>
                <div className={classes.content}>{content}</div>
            </div>
        </div>
        <div className={classes.bottom}>{footer}</div>
    </div>
);

AppLayout.propTypes = {
    info: PropTypes.node.isRequired,
    energy: PropTypes.node.isRequired,
    sidebar: PropTypes.node.isRequired,
    tabs: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    classes: PropTypes.object.isRequired,
};

AppLayout.defaultProps = {
    loading: false,
};

export default injectSheet(styles)(AppLayout);
