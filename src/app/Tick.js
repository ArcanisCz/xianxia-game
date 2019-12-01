import React from 'react';
import {useDispatch} from "react-redux";

import {Button} from "components/atoms";
import time from "core/time";

export const Tick = () => {
    const dispatch = useDispatch();

    return (
        <Button
            onClick={() => dispatch(time.tick())}
            text="tick"
        />
    );
};
