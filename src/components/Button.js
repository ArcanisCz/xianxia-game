import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";

import style from "./Button.scss";

export const Button = ({
    text,
    block = false,
    disabled = false,
}) => (
    <div
        className={classnames(style.button, {
            [style.block]: block,
            [style.disabled]: disabled,
        })}
    >
        {text}
    </div>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
};
