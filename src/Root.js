import React from 'react';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';

import App from './app/App';

// eslint-disable-next-line react/prop-types
const Root = ({store}) => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default hot(module)(Root);
