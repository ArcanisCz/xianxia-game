export default {
    font: {
        family: "'Open Sans', sans-serif",
        small: ".8rem",
        normal: "1rem",
        big: "1.2rem",
    },
    color: {
        grey: "#aaa",
        lightgrey: "#eee",
        panelBackground: "rgba(250,250,250,0.9)",
    },
    spacing: {
        normal: "1rem",
        small: ".5rem",
        xs: ".25rem",
    },
    transition: {
        fast: "150ms",
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
