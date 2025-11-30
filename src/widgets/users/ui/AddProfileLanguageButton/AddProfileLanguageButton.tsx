import { useState } from "react";
import Button from "@mui/material/Button";
import { AddProfileLanguageDialog } from "../AddProfileLanguageDialog/AddProfileLanguageDialog";

interface AddProfileLanguageButtonProps {
    onSubmit: (name: string, proficiency: string) => void;
    existingLanguageNames?: string[];
    loading?: boolean;
}

export const AddProfileLanguageButton = ({
    onSubmit,
    existingLanguageNames = [],
    loading = false,
}: AddProfileLanguageButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (name: string, proficiency: string) => {
        onSubmit(name, proficiency);
        handleClose();
    };

    return (
        <>
            <Button
                variant="text"
                onClick={handleOpen}
                disabled={loading}
                sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    fontSize: "1rem",
                    fontWeight: 400,
                    "&:hover": {
                        backgroundColor: "action.hover",
                        borderRadius: "50%",
                    },
                }}
            >
                Add Language
            </Button>
            <AddProfileLanguageDialog
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit}
                existingLanguageNames={existingLanguageNames}
                loading={loading}
            />
        </>
    );
};

