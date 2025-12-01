import { Stack, Typography, Box, Chip } from "@mui/material";
import type { CvProject } from "@entities/cv";

interface ProjectsDescriptionProps {
    projects: CvProject[];
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const ProjectsDescription = ({ projects }: ProjectsDescriptionProps) => {
    if (projects.length === 0) {
        return (
            <Stack spacing={2} className="cv-projects">
                <Typography variant="h6" component="h3" className="cv-projects-title">
                    Projects
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    No projects added yet.
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={3} className="cv-projects">
            <Typography variant="h6" component="h3" className="cv-projects-title">
                Projects
            </Typography>
            {projects.map((project) => (
                <Box key={project.id} className="cv-project-item">
                    <Stack spacing={1}>
                        <Typography variant="h6" component="h4" className="cv-project-name">
                            {project.name}
                        </Typography>
                        {project.domain && (
                            <Typography variant="body2" color="text.secondary" className="cv-project-domain">
                                Domain: {project.domain}
                            </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary" className="cv-project-dates">
                            {formatDate(project.start_date)} - {project.end_date ? formatDate(project.end_date) : "Present"}
                        </Typography>
                        {project.description && (
                            <Typography variant="body1" className="cv-project-description">
                                {project.description}
                            </Typography>
                        )}
                        {project.roles.length > 0 && (
                            <Box className="cv-project-roles">
                                <Typography variant="body2" fontWeight="bold" className="cv-project-roles-title">
                                    Roles:
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
                                    {project.roles.map((role, index) => (
                                        <Chip key={index} label={role} size="small" className="cv-project-role-chip" />
                                    ))}
                                </Box>
                            </Box>
                        )}
                        {project.responsibilities.length > 0 && (
                            <Box className="cv-project-responsibilities">
                                <Typography variant="body2" fontWeight="bold" className="cv-project-responsibilities-title">
                                    Responsibilities:
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 0 }} className="cv-project-responsibilities-list">
                                    {project.responsibilities.map((responsibility, index) => (
                                        <li key={index} className="cv-project-responsibility-item">
                                            <Typography variant="body2" component="span">
                                                {responsibility}
                                            </Typography>
                                        </li>
                                    ))}
                                </Box>
                            </Box>
                        )}
                        {project.environment.length > 0 && (
                            <Box className="cv-project-environment">
                                <Typography variant="body2" fontWeight="bold" className="cv-project-environment-title">
                                    Environment:
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
                                    {project.environment.map((env, index) => (
                                        <Chip key={index} label={env} size="small" variant="outlined" className="cv-project-env-chip" />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

