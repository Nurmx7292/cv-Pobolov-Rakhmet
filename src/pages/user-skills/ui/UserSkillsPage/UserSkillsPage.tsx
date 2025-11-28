import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const UserSkillsPage = () => {
    const { userId } = useParams();

    return (
        <Stack spacing={1.5} padding={3}>
            <Typography variant="h4" component="h1">
                Skills
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {userId ? `User ID: ${userId}` : "No user selected yet."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Mock for now
            </Typography>
        </Stack>
    );
};


