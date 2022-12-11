import React from "react";

import {Button} from '../atoms';

const noop = () => {
};
export const TestMolecule = () => (
    <div>
        <Button onClick={noop} text="Aaaa" />
        <Button onClick={noop} text="Bbbbb" />
    </div>
);
