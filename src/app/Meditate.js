import {canMeditate, meditate} from "game";
import {app} from "core/util";
import {Button} from "components/atoms";

const mapStateToProps = (state) => ({
    disabled: !canMeditate(state),
});

const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(meditate()),
});

const mergeProps = ({disabled}, {onClick}, {t}) => ({
    disabled,
    onClick,
    text: t("aaa.neco"),
});

export default app.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Button);
