import React, {Fragment} from 'react';

import {Button} from "components";

export const ComponentShowcase = () => (
    <div>
        <Button text='Button' />
        <Button text='Button disabled' disabled />
        <Button text='Button block' block />
    </div>
);
