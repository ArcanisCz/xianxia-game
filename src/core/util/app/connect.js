import {compose} from "redux";
import {connect} from "react-redux";
import i18n from "../../i18n";

export default (mapStateToProps, mapDispatchToProps, mergeProps) => compose(
    i18n.withTranslation(),
    connect(mapStateToProps, mapDispatchToProps, mergeProps),
);
