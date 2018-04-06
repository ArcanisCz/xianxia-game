import React, {Fragment} from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

import {types, number} from "core/util";

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
        width: "60px",
        display: "inline-block",
        color: ({perSecond}) => (perSecond > 0 ? theme.color.green : theme.color.red),
        fontSize: theme.font.small,
        textAlign: "right",
    },
    amount: {
        flex: 1,
        textAlign: "right",
    },
    max: {
        width: "60px",
        color: theme.color.grey,
    },
});

const ResourceComponent = ({current, max, displayName, perSecond, msg, classes}) => (
    <div className={classes.container}>
        <span className={classes.name}>{displayName}</span>
        <div className={classes.amount}>
            {number.formatInt(current)}
        </div>
        <div className={classes.max}>
            {max && (
                <Fragment>
                    &nbsp;/&nbsp;{number.formatInt(max)}
                </Fragment>
            )}
        </div>
        <span className={classes.perSecond}>
            {perSecond && (
                <Fragment>
                    {number.formatFloat(perSecond)} /{msg.secondShort}
                </Fragment>
            )}
        </span>
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
