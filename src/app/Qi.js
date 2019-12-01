import React from 'react';
import {useSelector, useDispatch} from "react-redux";

import {Button} from "components/atoms";
import {gameSelectors, gameActions} from "core/game";

export const Qi = () => {
    const dispatch = useDispatch();

    const qi = useSelector(gameSelectors.getQiValue);
    const qiMax = useSelector(gameSelectors.getQiMax);
    const disabled = qi >= qiMax;

    return (
        <div>
            <div>{qi} / {qiMax}</div>
            <Button
                onClick={() => dispatch(gameActions.meditate(1))}
                text="addQi"
                disabled={disabled}
            />
        </div>
    );
};
