import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {types} from "core/util";

const Wrapper = styled.section`
  padding: 4em;
  background: ${(props) => props.theme.main};
`;

export const ResourceStatus = ({current, max, displayName, perSecond, msg}) => (
    <Wrapper>
        <span>{displayName}: </span>
        <span>{current}/{max}</span>
        <span>({perSecond}/{msg.secondShort})</span>
    </Wrapper>
);

ResourceStatus.propTypes = {
    current: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    perSecond: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    msg: types.msgProps(["secondShort"]).isRequired,
};

