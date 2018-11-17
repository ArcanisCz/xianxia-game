import React from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";

import style from "./Button.scss";

export const Button = ({
    text,
    onClick,
    block = false,
    disabled = false,
}) => (
    <div
        className={classnames(style.button, {
            [style.block]: block,
            [style.disabled]: disabled,
        })}
        onClick={!disabled ? () => onClick() : undefined}
    >
        {text}
    </div>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
};
