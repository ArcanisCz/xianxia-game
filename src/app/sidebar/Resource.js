import PropTypes from "prop-types";
import {connect} from "react-redux";

import i18n from "core/i18n";
import {number} from "core/util";
import resources from "core/resources";

import {ResourceStatus} from "components";

const getMessages = i18n.createGetMessages({
    secondShort: "unit.second.short",
});

const mapStateToProps = (state, {resource}) => ({
    current: resources.getCurrent(state, resource),
    max: resources.getMax(state, resource),
    perSecond: resources.getPerSecond(state, resource),
    displayName: i18n.getMessage(state, resource),
    msg: getMessages(state),
});

const mergeProps = ({current, max, perSecond, displayName, msg}) => ({
    current: number.formatInt(current),
    max: max < Infinity ? number.formatInt(max) : null,
    perSecond: perSecond !== 0 ? number.formatFloat(perSecond) : null,
    displayName,
    msg,
});

export const Resource = connect(mapStateToProps, undefined, mergeProps)(ResourceStatus);

Resource.propTypes = {
    resource: PropTypes.string.isRequired,
};
