import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark";

interface ThemeModeContextValue {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const STORAGE_KEY = "cv_theme_mode";

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

const getInitialMode = (): ThemeMode => {
    if (typeof window === "undefined") {
        return "dark";
    }

    const storedMode = window.localStorage.getItem(STORAGE_KEY);
    if (storedMode === "light" || storedMode === "dark") {
        return storedMode;
    }

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
};

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => getInitialMode());

    const toggleTheme = () => {
        setMode((currentMode) => {
            const nextMode: ThemeMode = currentMode === "dark" ? "light" : "dark";
            if (typeof window !== "undefined") {
                window.localStorage.setItem(STORAGE_KEY, nextMode);
            }
            return nextMode;
        });
    };

    const value = useMemo(
        () => ({
            mode,
            toggleTheme,
        }),
        [mode],
    );

    return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

export const useThemeMode = () => {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error("useThemeMode must be used within ThemeModeProvider");
    }
    return context;
};


