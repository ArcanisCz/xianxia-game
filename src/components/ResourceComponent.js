import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

import {types, number} from "core/util";

import ResourceBar from "./resource/ResourceBarComponent";

const styles = (theme) => ({
    container: {
        paddingBottom: theme.spacing.xs,
        display: "flex",
        alignItems: "center",
    },
    name: {
        width: "50px",
        fontSize: theme.font.small,
        color: theme.color.black,
    },
    perSecond: {
        width: "50px",
        display: "inline-block",
        color: theme.color.grey,
        fontSize: theme.font.small,
        textAlign: "right",
    },
    amount: {
        flex: 1,
    },
    bar: {
        flex: 1,
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
                {number.formatFloat(perSecond)} /{msg.secondShort}
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
