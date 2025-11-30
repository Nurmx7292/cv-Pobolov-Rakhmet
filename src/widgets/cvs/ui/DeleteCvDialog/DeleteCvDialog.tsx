import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Stack, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDeleteCv } from "@entities/cv";
import { useNotification } from "@shared/lib/notifications";
import type { CvListItem } from "@entities/cv";

interface DeleteCvDialogProps {
    open: boolean;
    onClose: () => void;
    cv: CvListItem;
    onSuccess?: () => void;
}

export const DeleteCvDialog = ({
    open,
    onClose,
    cv,
    onSuccess,
}: DeleteCvDialogProps) => {
    const [deleteCv, { loading, error }] = useDeleteCv();
    const { showNotification, NotificationComponent } = useNotification();

    const handleDelete = async () => {
        try {
            await deleteCv({
                variables: {
                    cv: {
                        cvId: cv.id,
                    },
                },
            });
            showNotification("CV was deleted", "success");
            onSuccess?.();
            onClose();
        } catch (err) {
            console.error("Failed to delete CV:", err);
            showNotification("Failed to delete CV", "error");
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" component="span">
                        Delete CV
                    </Typography>
                    <IconButton aria-label="close" onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ paddingX: "1rem" }}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error.message}</Alert>}
                        <Typography variant="body1">
                            Are you sure you want to delete CV "{cv.name}"? This action cannot be undone.
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="error"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
            <NotificationComponent />
        </>
    );
};

