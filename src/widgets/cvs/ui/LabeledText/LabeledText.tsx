import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

interface LabeledTextProps {
    label: ReactNode;
    children: ReactNode;
    sx?: SxProps<Theme>;
}

export const LabeledText = ({ label, children, sx }: LabeledTextProps) => {
    return (
        <Stack gap={1} sx={sx}>
            {typeof label === "string" ? (
                <Typography fontWeight={700}>{label}</Typography>
            ) : (
                label
            )}
            {typeof children === "string" ? (
                <Typography
                    sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        "@media print": {
                            color: theme.palette.secondary.main,
                        },
                    })}
                >
                    {children}
                </Typography>
            ) : (
                children
            )}
        </Stack>
    );
};

