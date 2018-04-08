export default {
    font: {
        family: "'Open Sans', sans-serif",
        small: ".8rem",
        normal: "1rem",
        big: "1.2rem",
    },
    color: {
        black: "black",
        white: "white",
        grey: "#888",
        lightgrey: "#eee",
        green: "#80E85A",
        red: "red",
        panelBackground: "rgba(250,250,250,0.9)",
        greyBorder: "#aaa",
    },
    spacing: {
        normal: "1rem",
        small: ".5rem",
        xs: ".25rem",
    },
    easing: {
        // This is the most common easing curve.
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Objects enter the screen at full velocity from off-screen and
        // slowly decelerate to a resting point.
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        // Objects leave the screen at full velocity. They do not decelerate when off-screen.
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        // The sharp curve is used by objects that may return to the screen at any time.
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    transition: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
    },
    helper: {
        glassEffect: {
            "&:before": {
                zIndex: -1,
                display: "block",
                position: "absolute",
                content: "' '",
                filter: "blur(10px)",
                opacity: 0.5,
                backgroundSize: "cover",
            },
        },
    },
};
