import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface DeleteProfileLanguageButtonProps {
    selectedLanguageNames: string[];
    onDelete: (languageNames: string[]) => void;
    loading?: boolean;
}

export const DeleteProfileLanguageButton = ({
    selectedLanguageNames,
    onDelete,
    loading = false,
}: DeleteProfileLanguageButtonProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClick = () => {
        if (isDeleting) {
            onDelete(selectedLanguageNames);
            setIsDeleting(false);
        } else {
            setIsDeleting(true);
        }
    };

    const handleCancel = () => {
        setIsDeleting(false);
    };

    if (selectedLanguageNames.length === 0 && !isDeleting) {
        return null;
    }

    return (
        <Button
            variant="text"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleClick}
            disabled={loading || (isDeleting && selectedLanguageNames.length === 0)}
            sx={{
                textTransform: "none",
                color: "error.main",
                "&:hover": {
                    backgroundColor: "error.light",
                    color: "error.dark",
                },
            }}
        >
            {isDeleting
                ? `Delete ${selectedLanguageNames.length} language${selectedLanguageNames.length !== 1 ? "s" : ""}`
                : "Delete"}
        </Button>
    );
};

