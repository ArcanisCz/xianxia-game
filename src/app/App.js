import React from 'react';
import {useSelector} from "react-redux";

import init from "core/init";

import {Qi} from "./Qi";

export const App = () => {
    const loading = !useSelector(init.isInitialized);

    return (
        <div>
            Layout TODO
            {!loading ? (
                <div>
                    <Qi />
                </div>
            ) : null}
        </div>
    );
};
