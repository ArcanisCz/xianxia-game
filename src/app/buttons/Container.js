import React from "react";
// import PropTypes from "prop-types";
import {connect} from "react-redux";

import {SectionLayout} from "components";
import actions from "game/actions";

import {ActionButton} from "./ActionButton";

const Container = () => (
    <SectionLayout>
        <ActionButton action={actions.MEDITATE}/>
    </SectionLayout>
);

Container.propTypes = {
};

Container.defaultProps = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
