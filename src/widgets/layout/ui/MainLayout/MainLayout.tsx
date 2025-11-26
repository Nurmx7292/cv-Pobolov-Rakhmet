import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "background.default",
            }}
        >
            <Box
                sx={{
                    width: 0,
                    flexShrink: 0,
                }}
            />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflow: "auto",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

