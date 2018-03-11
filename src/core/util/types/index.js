import PropTypes from "prop-types";

export default {
    msgProps: (messages) => PropTypes.shape({
        ...messages.reduce((acc, msg) => Object.assign(acc, {[msg]: PropTypes.string.isRequired}), {}),
    }),
};
