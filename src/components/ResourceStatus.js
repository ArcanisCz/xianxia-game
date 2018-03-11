import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

import {types} from "core/util";

const styles = (theme) => ({
    container: {
        background: theme.main,
    },
});

const ResourceStatus = ({current, max, displayName, perSecond, msg, classes}) => (
    <div className={classes.container}>
        <span>{displayName}: </span>
        <span>{current}/{max}</span>
        <span>({perSecond}/{msg.secondShort})</span>
    </div>
);

ResourceStatus.propTypes = {
    current: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    perSecond: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    msg: types.msgProps(["secondShort"]).isRequired,
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ResourceStatus);
