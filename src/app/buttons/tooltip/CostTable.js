import React from "react";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {Map} from "immutable";

import {Text} from "components";
import {Msg} from "containers";
import {number} from "core/util";

const CostTable = ({costs}) => (
    <div>
        {costs.keySeq().toArray().map((resource) => (
            <div key={resource}>
                <Msg grey msg={resource} />
                <Text grey>: </Text>
                <Text>{number.formatInt(costs.get(resource))}</Text>
            </div>
        ))}
    </div>
);

CostTable.propTypes = {
    costs: IPropTypes.mapOf(PropTypes.string, PropTypes.number),
};

CostTable.defaultProps = {
    costs: Map(),
};

export default CostTable;
