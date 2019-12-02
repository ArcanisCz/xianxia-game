import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

import {Button} from "components/atoms";
import {gameActions, gameSelectors} from "core/game";

export const Activity = ({activity}) => {
    const dispatch = useDispatch();
    const activeActivity= useSelector(gameSelectors.getActiveActivity);

    return (
        <Button
            disabled={activeActivity === activity}
            onClick={() => dispatch(gameActions.activateActivity(activity))}
            text={activity}
        />
    );
};

Activity.propTypes = {
    activity: PropTypes.string.isRequired,
};
