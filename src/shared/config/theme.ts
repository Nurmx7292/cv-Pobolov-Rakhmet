import { createTheme } from "@mui/material";

export const createAppTheme = (mode: "dark" | "light") => {
    const backgroundColor = mode === "dark" ? "#353535" : "#ffffff";

    return createTheme({
        palette: {
            mode,
            primary: {
                main: "#C63031",
                light: "#d95557",
                dark: "#8c2122",
            },
            secondary: {
                main: "#767676",
            },
            background: {
                default: backgroundColor,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: { backgroundColor },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 40,
                        textTransform: "uppercase",
                        height: 48,
                    },
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        color: mode === "dark" ? "#ffffff" : "#767676",
                    },
                },
            },
            MuiBreadcrumbs: {
                styleOverrides: {
                    root: {
                        padding: "1rem 1.25rem 0.25rem",
                    },
                },
            },
        },
    });
};


