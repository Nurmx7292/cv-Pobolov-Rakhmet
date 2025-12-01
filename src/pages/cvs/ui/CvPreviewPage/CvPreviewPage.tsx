import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import {
    CvDescription,
    ProfessionalSkills,
    ProjectsDescription,
    ExportPdfButton,
    type CvPageContextValue,
} from "@widgets/cvs";

export const CvPreviewPage = () => {
    const { cv } = useOutletContext<CvPageContextValue>();
    const ref = useRef<HTMLDivElement>(null);

    if (!cv) {
        return null;
    }

    return (
        <Stack alignItems="center">
            <Box
                ref={ref}
                maxWidth="900px"
                width="100%"
                px={3}
                sx={{
                    "@media print": {
                        maxWidth: "unset",
                        padding: 0,
                    },
                }}
            >
                <Stack component="header" direction="row" alignItems="start" sx={{ mb: 4 }}>
                    <Stack flexGrow={1}>
                        <Typography variant="h3" sx={{ fontSize: "2.125rem" }}>
                            {cv.user?.profile.full_name}
                        </Typography>
                        {cv.user?.position_name && (
                            <Typography variant="subtitle1" textTransform="uppercase">
                                {cv.user.position_name}
                            </Typography>
                        )}
                    </Stack>
                    <ExportPdfButton elementRef={ref} fileName={cv.name} />
                </Stack>
                <CvDescription cv={cv} />
                {cv.projects && cv.projects.length > 0 && <ProjectsDescription cv={cv} />}
                {cv.skills && cv.skills.length > 0 && <ProfessionalSkills skills={cv.skills} />}
            </Box>
        </Stack>
    );
};
