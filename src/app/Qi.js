import React from 'react';
import {useSelector, useDispatch} from "react-redux";

import {Button} from "components/atoms";
import {gameSelectors, gameActions} from "core/game";

export const Qi = () => {
    const qi = useSelector(gameSelectors.getQiValue);
    const qiMax = useSelector(gameSelectors.getQiMax);
    const dispatch = useDispatch();

    return (
        <div>
            <div>{qi} / {qiMax}</div>
            <Button onClick={() => dispatch(gameActions.addQi(1))} text="addQi" />
        </div>
    );
};
