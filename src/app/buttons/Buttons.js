import React from "react";

import {Button} from "components";

const noop = () => {}; // TODO

const Buttons = () => (
    <div>
        <Button text="Pokus" onClick={noop} /> &nbsp;
        <Button text="Pokus" onClick={noop} disabled /> &nbsp;
        <Button text="Pokus" onClick={noop} progress={0.1} /> &nbsp;
        <Button text="Pokus" onClick={noop} disabled progress={0.2} /> &nbsp;
    </div>
);

export default Buttons;
