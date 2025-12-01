import { useState } from "react";
import { Stack, Typography, Box, Breadcrumbs } from "@mui/material";
import { CvsTable, DeleteCvDialog } from "@widgets/cvs";
import { CreateCvButton } from "@widgets/cvs";
import { Searchbar } from "@shared/ui";
import { useNotification } from "@shared/lib/notifications";
import type { CvListItem } from "@entities/cv";

export const CvsPage = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCv, setSelectedCv] = useState<CvListItem | null>(null);
    const [searchString, setSearchString] = useState("");
    const { showNotification, NotificationComponent } = useNotification();

    const currentUserId = localStorage.getItem("currentUserId");

    const handleDelete = (cv: CvListItem) => {
        setSelectedCv(cv);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedCv(null);
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
            <Stack spacing={2} sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                <Stack spacing={0.5}>
                    <Breadcrumbs>
                        <Typography>CVs</Typography>
                    </Breadcrumbs>
                    <Stack
                        direction="row"
                        gap={2}
                        sx={{
                            paddingLeft: "1.25rem",
                            paddingTop: "0.5rem",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Searchbar value={searchString} onChange={setSearchString} />
                        <CreateCvButton userId={currentUserId} />
                    </Stack>
                </Stack>
                <Box sx={{ flex: 1, minHeight: 0, overflow: "auto", px: "1.25rem", pb: "2rem" }}>
                    <CvsTable searchString={searchString} onDelete={handleDelete} />
                </Box>
            </Stack>
            {selectedCv && (
                <DeleteCvDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteClose}
                    cv={selectedCv}
                    onSuccess={handleDeleteSuccess}
                />
            )}
            <NotificationComponent />
        </>
    );
};
