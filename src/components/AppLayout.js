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
        borderBottom: `1px solid ${theme.color.greyBorder}`,
    },
    middle: {
        flex: "1",
        display: "flex",
        flexDirection: "row",
        borderBottom: `1px solid ${theme.color.greyBorder}`,
    },
    bottom: {
        // TODO
    },
    info: {
        width: "250px",
        borderRight: `1px solid ${theme.color.greyBorder}`,
    },
    tabs: {
        flex: 1,
    },
    sidebar: {
        width: "250px",
        borderRight: `1px solid ${theme.color.greyBorder}`,
        marginLeft: ({showSidebar}) => (showSidebar ? "0px" : "-250px"),
        transition: `margin ${theme.transition.enteringScreen}ms ${theme.easing.easeOut}`,
    },
    content: {
        flex: 1,
    },
});

export const AppLayout = ({info, sidebar, tabs, content, footer, classes, loading}) => !loading && (
    <div className={classes.container}>
        {(info || tabs) && (
            <div className={classes.top}>
                <div className={classes.info}>{info}</div>
                <div className={classes.tabs}>{tabs}</div>
            </div>
        )}
        <div className={classes.middle}>
            <div className={classes.sidebar}>{sidebar}</div>
            <div className={classes.content}>{content}</div>
        </div>
        <div className={classes.bottom}>{footer}</div>
    </div>
);

AppLayout.propTypes = {
    content: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    sidebar: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    showSidebar: PropTypes.bool,
    info: PropTypes.node,
    tabs: PropTypes.node,
};

AppLayout.defaultProps = {
    loading: false,
    showSidebar: false,
    info: null,
    tabs: null,
};

export default injectSheet(styles)(AppLayout);
