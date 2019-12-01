import React from 'react';
import PropTypes from "prop-types";

import {useSelector} from "react-redux";

import {gameSelectors} from "core/game";

export const Resource = ({resource}) => {
    const value = useSelector((state) => gameSelectors.getResourceValue(state, resource));
    const max = useSelector((state) => gameSelectors.getResourceMax(state, resource));
    const perSec = useSelector((state) => gameSelectors.getResourcePerSecond(state, resource));

    return (
        <div>
            <span>{value} / {max} ({perSec} /sec)</span>&nbsp;
            <span>({resource})</span>
        </div>
    );
};

Resource.propTypes = {
    resource: PropTypes.string.isRequired,
};
