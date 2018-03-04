import React from 'react';
import {connect} from "react-redux";

import pokus from "./pokus";

const App = ({count, onAdd}) => (
    <div>
        <div>Hello! {count}</div>
        <button onClick={onAdd}>Add</button>
    </div>
);

const mapStateToProps = (state) => ({
    count: pokus.getCount(state),
});

const mapDispatchToProps = (dispatch) => ({
   onAdd: () => dispatch(pokus.add()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
