import React from "react";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";

import log from "core/log";

const Container = ({messages}) => (
    <div>
        {messages.map((msg) => (
            <div key={msg.get("date")}>{msg.get("date")}: {msg.get("text")}</div>
        ))}
    </div>
);

Container.propTypes = {
    messages: IPropTypes.listOf(IPropTypes.contains({
        date: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
};

const mapStateToProps = (state) => ({
    messages: log.getMessages(state),
});

export default connect(mapStateToProps)(Container);
