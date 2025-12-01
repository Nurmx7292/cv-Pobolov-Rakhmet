import { Box, Typography, List, ListItem } from "@mui/material";
import { useMemo } from "react";
import type { Cv } from "@entities/cv";
import { CvReviewSection } from "../CvReviewSection/CvReviewSection";
import { LabeledText } from "../LabeledText/LabeledText";
import { useTheme } from "@mui/material/styles";

interface ProjectsDescriptionProps {
    cv: Cv;
}

export const ProjectsDescription = ({ cv }: ProjectsDescriptionProps) => {
    const theme = useTheme();

    const sortedProjects = useMemo(() => {
        return (cv.projects || []).slice().sort((a, b) => {
            const now = new Date();
            const dateA = a.end_date ? new Date(a.end_date) : now;
            const dateB = b.end_date ? new Date(b.end_date) : now;
            return dateB.getTime() - dateA.getTime();
        });
    }, [cv.projects]);

    if (!cv.projects || cv.projects.length === 0) {
        return null;
    }

    return (
        <Box>
            <Typography variant="h3" sx={{ fontSize: "2.125rem" }}>
                Projects
            </Typography>
            {sortedProjects.map((project) => (
                <Box sx={{ breakAfter: "page" }} key={project.id}>
                    <CvReviewSection
                        left={
                            <>
                                <LabeledText
                                    sx={{ mt: "1rem" }}
                                    label={
                                        <Typography
                                            sx={{
                                                color: theme.palette.primary.main,
                                                textTransform: "uppercase",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {project.name}
                                        </Typography>
                                    }
                                >
                                    {project.description}
                                </LabeledText>
                            </>
                        }
                        right={
                            <>
                                <LabeledText label="Project roles" sx={{ mt: "1rem" }}>
                                    {(project.roles.length > 0
                                        ? project.roles
                                        : cv.user?.position_name
                                            ? [cv.user.position_name]
                                            : []
                                    ).join(", ")}
                                </LabeledText>
                                <LabeledText label="Period">
                                    {`${project.start_date} - ${project.end_date || "Till now"}`}
                                </LabeledText>
                                <LabeledText label="Responsibilities">
                                    {project.responsibilities.length > 0 && (
                                        <List
                                            sx={{
                                                listStyleType: "disc",
                                                listStylePosition: "inside",
                                                "& li::marker": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            {project.responsibilities.map((r) => (
                                                <ListItem
                                                    key={r}
                                                    sx={(theme) => ({
                                                        display: "list-item",
                                                        p: 0,
                                                        color: theme.palette.text.secondary,
                                                        "@media print": {
                                                            color: theme.palette.secondary.main,
                                                        },
                                                    })}
                                                >
                                                    {r}
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </LabeledText>
                                <LabeledText label="Environment" sx={{ mb: "1rem" }}>
                                    {project.environment.join(", ")}
                                </LabeledText>
                            </>
                        }
                    />
                </Box>
            ))}
        </Box>
    );
};
