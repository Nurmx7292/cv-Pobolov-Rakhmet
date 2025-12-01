import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AddProfileLanguageForm } from "../AddProfileLanguageForm/AddProfileLanguageForm";

interface AddProfileLanguageDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string, proficiency: string) => void;
    existingLanguageNames?: string[];
    loading?: boolean;
    error?: Error | null;
}

export const AddProfileLanguageDialog = ({
    open,
    onClose,
    onSubmit,
    existingLanguageNames = [],
    loading = false,
    error,
}: AddProfileLanguageDialogProps) => {
    const handleSubmit = (name: string, proficiency: string) => {
        onSubmit(name, proficiency);
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
                Add Language
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
                <AddProfileLanguageForm
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    existingLanguageNames={existingLanguageNames}
                    disabled={loading}
                    error={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="add-language-form"
                    variant="contained"
                    disabled={loading}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

