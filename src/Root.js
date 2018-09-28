import {h} from 'preact';
import {Provider} from 'preact-redux';

import App from './app/App';

// eslint-disable-next-line react/prop-types
export default ({store}) => (
    <Provider store={store}>
        <App />
    </Provider>
);
