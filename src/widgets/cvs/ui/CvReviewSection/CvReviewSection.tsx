import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";

interface CvReviewSectionProps {
    left: ReactNode;
    right: ReactNode;
}

export const CvReviewSection = ({ left, right }: CvReviewSectionProps) => {
    const theme = useTheme();

    return (
        <Stack direction="row" gap={3} sx={{ my: "2rem" }}>
            <Stack flexShrink={0} maxWidth="260px" width="100%" gap={2}>
                {left}
            </Stack>
            <Stack
                flexGrow={1}
                gap={2}
                paddingLeft={3}
                sx={{
                    borderLeft: `1px solid ${theme.palette.primary.main}`,
                }}
            >
                {right}
            </Stack>
        </Stack>
    );
};

