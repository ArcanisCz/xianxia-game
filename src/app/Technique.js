import React from 'react';

import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";

import {gameSelectors, gameActions} from "core/game";

export const Technique = ({technique}) => {
    const dispatch = useDispatch();

    const level = useSelector((state) => gameSelectors.getTechniqueLevel(state, technique));
    const canPay = useSelector((state) => gameSelectors.canPayTechniqueLevelUp(state, technique));
    const prices = useSelector((state) => gameSelectors.getTechniquePrice(state, technique));

    return (
        <div>
            {technique} ({level})&nbsp;
            <button
                type="button"
                disabled={!canPay}
                onClick={() => dispatch(gameActions.techniqueLevelUp(technique))}
            >
                Level up
            </button>
            {prices.map((price, resource) => (
                <div key={resource}>{resource}: {price}</div>
            )).toList().toArray()}
        </div>
    );
};

Technique.propTypes = {
    technique: PropTypes.string.isRequired,
};
