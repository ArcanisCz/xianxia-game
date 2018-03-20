import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

import {types} from "core/util";

const styles = (theme) => ({
    container: {
        padding: theme.spacing.xs,
    },
    name: {
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    amount: {
        marginLeft: theme.spacing.small,
    },
    perSecond: {
        color: theme.color.grey,
        fontSize: theme.font.small,
        marginLeft: theme.spacing.small,
    },
});

const ResourceStatus = ({current, max, displayName, perSecond, msg, classes}) => (
    <div className={classes.container}>
        <span className={classes.name}>{displayName}</span>
        <span className={classes.amount}>
            {current}
            {max ? `/${max}` : ""}
        </span>
        {perSecond && <span className={classes.perSecond}>({perSecond}/{msg.secondShort})</span>}
    </div>
);

ResourceStatus.propTypes = {
    current: PropTypes.string.isRequired,
    max: PropTypes.string,
    perSecond: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    msg: types.msgProps(["secondShort"]).isRequired,
    classes: PropTypes.object.isRequired,
};

ResourceStatus.defaultProps = {
    max: null,
    perSecond: null,
};

export default injectSheet(styles)(ResourceStatus);