import React, {StrictMode} from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'react-jss';

import App from './app/App';

// eslint-disable-next-line react/prop-types
export default ({store, theme}) => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
);
