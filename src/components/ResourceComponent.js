import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

import {types, number} from "core/util";

import ResourceBar from "./resource/ResourceBarComponent";

const styles = (theme) => ({
    container: {
        padding: theme.spacing.xs,
    },
    name: {
        fontWeight: "bold",
        textTransform: "uppercase",
        display: "block",
    },
    amount: {},
    bar: {
        paddingTop: theme.spacing.small,
    },
    perSecond: {
        color: theme.color.grey,
        fontSize: theme.font.small,
        marginLeft: theme.spacing.small,
    },
});

const ResourceComponent = ({current, max, displayName, perSecond, msg, classes}) => (
    <div className={classes.container}>
        <span className={classes.name}>{displayName}</span>

        {max ? (
            <div className={classes.bar}>
                <ResourceBar value={current} max={max} />
            </div>
        ) : (
            <div className={classes.amount}>
                {number.formatInt(current)}
            </div>
        )}
        {perSecond && (
            <span className={classes.perSecond}>
                ({number.formatFloat(perSecond)}/{msg.secondShort})
            </span>
        )}
    </div>
);

ResourceComponent.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number,
    perSecond: PropTypes.number,
    displayName: PropTypes.string.isRequired,
    msg: types.msgProps(["secondShort"]).isRequired,
    classes: PropTypes.object.isRequired,
};

ResourceComponent.defaultProps = {
    max: null,
    perSecond: null,
};

export default injectSheet(styles)(ResourceComponent);
