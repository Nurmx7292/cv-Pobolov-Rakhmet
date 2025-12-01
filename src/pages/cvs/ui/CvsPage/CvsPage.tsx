import { useState, useMemo } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { useCvs } from "@entities/cv";
import { CvsTable, CreateCvDialog, UpdateCvDialog, DeleteCvDialog } from "@widgets/cvs";
import { CreateCvButton } from "@widgets/cvs";
import { useNotification } from "@shared/lib/notifications";
import type { CvListItem } from "@entities/cv";

export const CvsPage = () => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCv, setSelectedCv] = useState<CvListItem | null>(null);
    const { showNotification, NotificationComponent } = useNotification();

    const currentUserId = localStorage.getItem("currentUserId");

    const handleCreateClick = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateClose = () => {
        setCreateDialogOpen(false);
    };

    const handleEdit = (cv: CvListItem) => {
        setSelectedCv(cv);
        setUpdateDialogOpen(true);
    };

    const handleUpdateClose = () => {
        setUpdateDialogOpen(false);
        setSelectedCv(null);
    };

    const handleDelete = (cv: CvListItem) => {
        setSelectedCv(cv);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedCv(null);
    };

    const handleUpdateSuccess = () => {
        showNotification("CV was updated", "success");
    };

    const handleDeleteSuccess = () => {
        showNotification("CV was deleted", "success");
    };

    if (!currentUserId) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6">User ID not found</Typography>
            </Box>
        );
    }

    return (
        <>
            <Stack spacing={3} sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h1">
                        CVs
                    </Typography>
                    <CreateCvButton userId={currentUserId} />
                </Stack>
                <CvsTable onEdit={handleEdit} onDelete={handleDelete} />
            </Stack>
            <CreateCvDialog
                open={createDialogOpen}
                onClose={handleCreateClose}
                userId={currentUserId}
            />
            {selectedCv && (
                <>
                    <UpdateCvDialog
                        open={updateDialogOpen}
                        onClose={handleUpdateClose}
                        cv={selectedCv}
                        onSuccess={handleUpdateSuccess}
                    />
                    <DeleteCvDialog
                        open={deleteDialogOpen}
                        onClose={handleDeleteClose}
                        cv={selectedCv}
                        onSuccess={handleDeleteSuccess}
                    />
                </>
            )}
            <NotificationComponent />
        </>
    );
};

