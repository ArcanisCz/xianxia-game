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
        grey: "#aaa",
        lightgrey: "#eee",
        green: "#80E85A",
        panelBackground: "rgba(250,250,250,0.9)",
    },
    spacing: {
        normal: "1rem",
        small: ".5rem",
        xs: ".25rem",
    },
    transition: {
        normal: "150ms",
        fast: "75ms",
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
