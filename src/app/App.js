import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Button} from "components/atoms";
import init from "core/init";

const App = ({loading}) => (
    <div>
        Layout TODO
        {!loading ? (
            <div>
                <Button onClick={() => {}} text="aa" />
            </div>
        ) : (
            <div>Loading...</div>
        )}
    </div>
);

App.propTypes = {
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: !init.isInitialized(state),
});

export default connect(mapStateToProps)(App);
