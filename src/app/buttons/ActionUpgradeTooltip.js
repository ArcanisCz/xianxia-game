import React from "react";
import PropTypes from "prop-types";

import {CIRCULATE_QI} from "definitions";

import CirculateQiUpgrade from "./tooltip/CirculateQiUpgrade";

const ActionTooltip = ({action}) => {
    switch (action) {
        case CIRCULATE_QI:
            return <CirculateQiUpgrade />;
        default:
            return <div>TOOLTIP MISSING</div>;
    }
};

ActionTooltip.propTypes = {
    action: PropTypes.string.isRequired,
};

export default ActionTooltip;
