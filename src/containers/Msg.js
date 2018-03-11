import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import i18n from 'core/i18n';

import Text from './Text';

const mapStateToProps = (state, {msg}) => ({
    text: i18n.getMessage(state, msg),
});

/**
 * Prints translated message.
 * @param msg Message key.
 * @param params Parameters object (optional).
 */
const Msg = connect(mapStateToProps)(Text);

Msg.defaultProps = {
    params: null,
};

Msg.propTypes = {
    msg: PropTypes.string.isRequired,
};

Msg.displayName = "Msg";

export default Msg;
