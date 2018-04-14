import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Text} from "components";
import {Msg} from "containers";
import {CIRCULATE_QI} from "definitions/constants";
import {perSecondMap} from "definitions/actions";
import {number} from "core/util";

const CirculateQi = ({duration}) => (
    <Fragment>
        {/* TODO add real ammount */}
        <Msg msg="text.willGain" grey />{ }
        <Text> 1 </Text>
        <Msg msg="resource.qi" /> <Msg msg="text.after" grey />
        <Text> {number.formatInt(duration)} </Text>
        <Msg msg="unit.second.short" />
        <Text grey>.</Text>
    </Fragment>
);

CirculateQi.propTypes = {
    duration: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    duration: perSecondMap.get(CIRCULATE_QI)(state),
});

export default connect(mapStateToProps)(CirculateQi);
