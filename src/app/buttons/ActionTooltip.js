import React from "react";
import PropTypes from "prop-types";

import {CIRCULATE_QI} from "definitions";

import CirculateQi from "./tooltip/CirculateQi";

const ActionTooltip = ({action}) => {
    switch (action) {
        case CIRCULATE_QI:
            return <CirculateQi />;
        default:
            return <div>TOOLTIP MISSING</div>;
    }
};

ActionTooltip.propTypes = {
    action: PropTypes.string.isRequired,
};

export default ActionTooltip;
