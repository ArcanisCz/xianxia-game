import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

const styles = (theme) => ({
    container: {
        width: "100%",
        height: "100%",
        background: "url('https://i.imgur.com/iJFMtc6.jpg') black", // TODO
        display: "flex",
        flexDirection: "column",
    },
    top: {
        height: "50px",
        background: theme.color.panelBackground,
        margin: theme.spacing.normal,
        padding: theme.spacing.small,
    },
    bottom: {
        flex: "1",
        display: "flex",
    },
    sidebar: {
        width: "200px",
        marginLeft: theme.spacing.normal,
        marginRight: theme.spacing.normal,
        marginBottom: theme.spacing.normal,
        background: theme.color.panelBackground,
        padding: theme.spacing.small,
    },
    content: {
        flex: "1",
        marginRight: theme.spacing.normal,
        marginBottom: theme.spacing.normal,
        background: theme.color.panelBackground,
        padding: theme.spacing.small,
    },
});

const ResourceStatus = ({title, sidebar, content, classes}) => (
    <div className={classes.container}>
        <div className={classes.top}>
            {title}
        </div>
        <div className={classes.bottom}>
            <div className={classes.sidebar}>
                {sidebar}
            </div>
            <div className={classes.content}>
                {content}
            </div>
        </div>
    </div>
);

ResourceStatus.propTypes = {
    title: PropTypes.node.isRequired,
    sidebar: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ResourceStatus);
