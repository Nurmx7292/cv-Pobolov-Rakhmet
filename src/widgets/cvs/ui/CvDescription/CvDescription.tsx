import { Stack, Typography, Box } from "@mui/material";
import type { Cv } from "@entities/cv";

interface CvDescriptionProps {
    cv: Cv;
}

export const CvDescription = ({ cv }: CvDescriptionProps) => {
    return (
        <Stack spacing={2} className="cv-description">
            <Box>
                <Typography variant="h4" component="h1" className="cv-name">
                    {cv.name}
                </Typography>
                {cv.user?.profile?.full_name && (
                    <Typography variant="h6" component="h2" color="text.secondary" className="cv-user-name">
                        {cv.user.profile.full_name}
                    </Typography>
                )}
                {cv.user?.position_name && (
                    <Typography variant="body1" color="text.secondary" className="cv-position">
                        {cv.user.position_name}
                    </Typography>
                )}
            </Box>
            <Box>
                <Typography variant="h6" component="h3" className="cv-education-title">
                    Education
                </Typography>
                <Typography variant="body1" className="cv-education">
                    {cv.education}
                </Typography>
            </Box>
            {cv.description && (
                <Box>
                    <Typography variant="h6" component="h3" className="cv-description-title">
                        Description
                    </Typography>
                    <Typography variant="body1" className="cv-description-text">
                        {cv.description}
                    </Typography>
                </Box>
            )}
        </Stack>
    );
};

