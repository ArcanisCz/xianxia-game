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
    <button
        className={classnames(style.button, {
            [style.block]: block,
            [style.disabled]: disabled,
        })}
        onClick={!disabled ? () => onClick() : undefined}
        type="button"
    >
        {text}
    </button>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
};
