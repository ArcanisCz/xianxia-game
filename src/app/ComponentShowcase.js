import React from 'react';

import {Button} from "components";

export const ComponentShowcase = () => (
    <div>
        <Button text="Button" onClick={() => {}} /> <br /><br />
        <Button text="Button block" block onClick={() => {}} /> <br />
        <Button text="Button disabled" disabled onClick={() => {}} /> <br /><br />
    </div>
);
