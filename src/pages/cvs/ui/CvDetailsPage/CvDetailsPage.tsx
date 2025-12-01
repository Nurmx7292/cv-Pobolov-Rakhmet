import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import { UpdateCvDialog, type CvPageContextValue } from "@widgets/cvs";
import { useUpdateCv } from "@entities/cv";
import { useNotification } from "@shared/lib/notifications";
import type { CvListItem } from "@entities/cv";

export const CvDetailsPage = () => {
    const { cv, refetch } = useOutletContext<CvPageContextValue>();
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const { showNotification, NotificationComponent } = useNotification();

    const currentUserId = localStorage.getItem("currentUserId");
    const isEditable = cv?.user?.id === currentUserId;

    const handleUpdateSuccess = () => {
        showNotification("CV was updated", "success");
    };

    if (!cv) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6">CV not found</Typography>
            </Box>
        );
    }

    const cvListItem: CvListItem = {
        id: cv.id,
        name: cv.name,
        education: cv.education,
        description: cv.description,
        user: cv.user ? {
            id: cv.user.id,
            email: "",
        } : null,
    };

    return (
        <>
            <Stack spacing={3} sx={{ p: 3 }}>
                {isEditable && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            onClick={() => setUpdateDialogOpen(true)}
                        >
                            Edit CV
                        </Button>
                    </Box>
                )}
                <Stack spacing={2}>
                    <Typography variant="h5" component="h1">
                        {cv.name}
                    </Typography>
                    <Box>
                        <Typography variant="h6" component="h3">
                            Education
                        </Typography>
                        <Typography variant="body1">{cv.education}</Typography>
                    </Box>
                    {cv.description && (
                        <Box>
                            <Typography variant="h6" component="h3">
                                Description
                            </Typography>
                            <Typography variant="body1">{cv.description}</Typography>
                        </Box>
                    )}
                </Stack>
            </Stack>
            {isEditable && (
                <UpdateCvDialog
                    open={updateDialogOpen}
                    onClose={() => setUpdateDialogOpen(false)}
                    cv={cvListItem}
                    onSuccess={handleUpdateSuccess}
                />
            )}
            <NotificationComponent />
        </>
    );
};
