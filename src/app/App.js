import React from 'react';
import {Provider} from 'react-redux';

// eslint-disable-next-line react/prop-types
export default ({store}) => (
    <Provider store={store}>
        <div>Hello!</div>
    </Provider>
);
