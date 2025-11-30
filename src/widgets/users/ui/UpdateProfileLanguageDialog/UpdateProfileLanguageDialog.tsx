import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ProfileLanguageForm } from "../ProfileLanguageForm/ProfileLanguageForm";

interface UpdateProfileLanguageDialogProps {
    open: boolean;
    onClose: () => void;
    languageName: string;
    initialProficiency: string;
    onSubmit: (proficiency: string) => void;
    loading?: boolean;
}

export const UpdateProfileLanguageDialog = ({
    open,
    onClose,
    languageName,
    initialProficiency,
    onSubmit,
    loading = false,
}: UpdateProfileLanguageDialogProps) => {
    const handleSubmit = (proficiency: string) => {
        onSubmit(proficiency);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 500,
                },
            }}
        >
            <DialogTitle>
                Update Language: {languageName}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ProfileLanguageForm
                    initialProficiency={initialProficiency}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    disabled={loading}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="update-language-form"
                    variant="contained"
                    disabled={loading}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

