import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, type ReactNode } from "react";
import { createAppTheme } from "@shared/config/theme.ts";
import { ThemeModeProvider, useThemeMode } from "@shared/lib/theme/themeContext.tsx";

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProviderInner = ({ children }: ThemeProviderProps) => {
    const { mode } = useThemeMode();
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export const WithThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <ThemeModeProvider>
            <ThemeProviderInner>{children}</ThemeProviderInner>
        </ThemeModeProvider>
    );
};


