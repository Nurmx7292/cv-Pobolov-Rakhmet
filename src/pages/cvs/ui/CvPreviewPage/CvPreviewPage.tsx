import { useOutletContext, useParams } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import {
    CvDescription,
    ProfessionalSkills,
    ProjectsDescription,
    CvLanguages,
    ExportPdfButton,
    type CvPageContextValue,
} from "@widgets/cvs";
import "@widgets/cvs/ui/CvPreview/CvPreview.module.css";

export const CvPreviewPage = () => {
    const { cv } = useOutletContext<CvPageContextValue>();
    const { cvId } = useParams<{ cvId: string }>();

    if (!cv || !cvId) {
        return null;
    }

    return (
        <Box className="cv-preview-container" sx={{ p: 3 }}>
            <Stack spacing={4}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <ExportPdfButton cvId={cvId} />
                </Box>
                <CvDescription cv={cv} />
                {cv.languages.length > 0 && <CvLanguages languages={cv.languages} />}
                {cv.skills.length > 0 && <ProfessionalSkills skills={cv.skills} />}
                {cv.projects.length > 0 && <ProjectsDescription projects={cv.projects} />}
            </Stack>
        </Box>
    );
};

