import React, {Fragment} from "react";
import IPropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";

import {Text} from "components";
import {Msg} from "containers";
import {CIRCULATE_QI} from "definitions/constants";
import {levelUpPriceMap} from "definitions/actions";

import CostTable from "./CostTable";

const CirculateQiUpgrade = ({cost}) => (
    <Fragment>
        <Text>+400 </Text>
        <Msg msg="text.max" grey /> <Msg msg="resource.qi" />
        <Text grey>. </Text>
        <br />
        <br />
        <CostTable costs={cost} />
    </Fragment>
);

CirculateQiUpgrade.propTypes = {
    cost: IPropTypes.map.isRequired,
};

const mapStateToProps = (state) => ({
    cost: levelUpPriceMap.get(CIRCULATE_QI)(state),
});

export default connect(mapStateToProps)(CirculateQiUpgrade);
