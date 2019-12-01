import React, {Fragment} from 'react';
import {useSelector} from "react-redux";

import init from "core/init";
import {gameSelectors} from "core/game";

import {Resource} from "./Resource";
import {Technique} from "./Technique";
import {Tick} from "./Tick";

export const App = () => {
    const loading = !useSelector(init.isInitialized);
    const resources = useSelector(gameSelectors.getResources);
    const techniques = useSelector(gameSelectors.getTechniques);

    return (
        <div>
            Layout TODO
            <Tick />
            {!loading ? (
                <div>
                    <br />
                    {resources.toJS().map((resource) => (
                        <Fragment key={resource}>
                            <Resource resource={resource} />
                            <hr />
                        </Fragment>
                    ))}
                    <br />
                    {techniques.toJS().map((technique) => (
                        <Fragment key={technique}>
                            <Technique technique={technique} />
                            <hr />
                        </Fragment>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
