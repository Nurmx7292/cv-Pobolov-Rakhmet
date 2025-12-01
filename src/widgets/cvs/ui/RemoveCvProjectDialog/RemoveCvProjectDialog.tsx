import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Stack, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { CvProject } from "@entities/cv";

interface RemoveCvProjectDialogProps {
    open: boolean;
    onClose: () => void;
    project: CvProject;
    onConfirm: () => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const RemoveCvProjectDialog = ({
    open,
    onClose,
    project,
    onConfirm,
    loading = false,
    error,
}: RemoveCvProjectDialogProps) => {
    const handleConfirm = async () => {
        await onConfirm();
        onClose();
    };

    return (
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
                    Remove Project
                </Typography>
                <IconButton aria-label="close" onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ paddingX: "1rem" }}>
                <Stack spacing={2}>
                    {error && <Alert severity="error">{error.message}</Alert>}
                    <Typography variant="body1">
                        Are you sure you want to remove project "{project.name}" from this CV? This action cannot be undone.
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="error"
                    disabled={loading}
                >
                    {loading ? "Removing..." : "Remove"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

