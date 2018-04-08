import React from "react";
// import PropTypes from "prop-types";
import {connect} from "react-redux";

import {SectionLayout} from "components";
import {CIRCULATE_QI} from "definitions/actions";

import {ActionButton} from "./ActionButton";

const Container = () => (
    <SectionLayout>
        <ActionButton action={CIRCULATE_QI} />
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
