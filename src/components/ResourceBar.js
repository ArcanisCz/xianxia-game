import React, {Component} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import injectSheet from "react-jss";

const getValue = (value, max) => Math.max(Math.min(value, max), 0);

const getMax = (max) => Math.max(0, max);

const styles = (theme) => ({
    container: {
        background: "#eee",
        width: "100%",
        border: `1px solid ${theme.color.black}`,
        position: "relative",
        height: "20px",
    },
    text: {
        color: theme.color.black,
        fontSize: theme.font.small,
        position: "absolute",
        zIndex: 10,
        width: "100%",
        textAlign: "center",
    },
    part: {
        top: 0,
        position: "absolute",
        height: "100%",
    },
    fullPart: {
        background: "red", // TODO variable color
    },
    fullTempPart: {
        background: "#BB5555", // TODO variable color
    },
    emptyTempPart: {
        background: "#FFAAAA", // TODO variable color
    },
    emptyPart: {},
});

class ResourceBar extends Component {
    constructor(props) {
        super(props);
        const max = getMax(this.props.max);
        const value = getValue(this.props.value, max);
        this.state = {
            max,
            value,
            displayValue: value,
        };
        this.timer = this.timer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const max = getMax(nextProps.max);
        const oldMax = getMax(this.props.max);
        const newValue = getValue(nextProps.value, max);
        if (max !== oldMax) {
            this.setState({
                max,
                value: newValue,
                displayValue: newValue,
            });
        } else {
            this.setState({
                max,
                value: newValue,
            }, () => setTimeout(this.timer, 250));
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.max !== this.state.max ||
            nextState.displayValue !== this.state.displayValue ||
            nextState.value !== this.state.value;
    }

    timer() {
        if (this.state.displayValue !== this.state.value) {
            const toAdd = (this.state.value - this.state.displayValue) / 10;
            this.setState({
                displayValue: this.state.displayValue + (toAdd > 0 ? Math.ceil(toAdd) : Math.floor(toAdd)),
            }, () => setTimeout(this.timer, 5));
        }
    }

    render() {
        const {classes} = this.props;
        const fullWidth = (this.state.value / this.state.max) * 100;
        const fullTempWidth = ((this.state.displayValue - this.state.value) / this.state.max) * 100;
        const emptyTempWidth = ((this.state.value - this.state.displayValue) / this.state.max) * 100;
        const emptyWidth = 100 - (fullWidth + fullTempWidth + emptyTempWidth);

        return (
            <div className={this.props.classes.container}>
                <span className={classes.text}>{this.state.value} / {this.state.max}</span>
                <span
                    className={classnames(classes.part, classes.fullPart)}
                    style={{width: `${fullWidth}%`, left: `${0}%`}}
                />
                <span
                    className={classnames(classes.part, classes.fullTempPart)}
                    style={{width: `${fullTempWidth}%`, left: `${fullWidth}%`}}
                />
                <span
                    className={classnames(classes.part, classes.emptyTempPart)}
                    style={{width: `${emptyTempWidth}%`, left: `${fullWidth + fullTempWidth}%`}}
                />
                <span
                    className={classnames(classes.part, classes.emptyPart)}
                    style={{width: `${emptyWidth}%`, left: `${fullWidth + fullTempWidth + emptyTempWidth}%`}}
                />
            </div>
        );
    }
}

ResourceBar.propTypes = {
    max: PropTypes.number.isRequired,
    value: PropTypes.number,
    classes: PropTypes.object.isRequired,
};

ResourceBar.defaultProps = {
    value: 0,
};

export default injectSheet(styles)(ResourceBar);
