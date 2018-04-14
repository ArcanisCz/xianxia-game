import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import i18n from 'core/i18n';

import {Text} from 'components';

const mapStateToProps = (state, {msg}) => ({
    text: i18n.getMessage(state, msg),
});

const mergeProps = ({text}, dispatch, {grey}) => ({
    children: text,
    grey,
});

/**
 * Prints translated message.
 * @param msg Message key.
 * @param params Parameters object (optional).
 */
const Msg = connect(mapStateToProps, undefined, mergeProps)(Text);

Msg.propTypes = {
    msg: PropTypes.string.isRequired,
    grey: PropTypes.bool,
};


Msg.defaultProps = {
    grey: false,
};

Msg.displayName = "Msg";

export default Msg;
