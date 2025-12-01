import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface DeleteProfileLanguageButtonProps {
    selectedLanguageNames: string[];
    onDelete: () => void;
    loading?: boolean;
    isSelecting?: boolean;
}

export const DeleteProfileLanguageButton = ({
    selectedLanguageNames,
    onDelete,
    loading = false,
    isSelecting = false,
}: DeleteProfileLanguageButtonProps) => {
    const handleClick = () => {
        onDelete();
    };

    if (isSelecting) {
        return (
            <Button
                variant="text"
                startIcon={<DeleteOutlineIcon />}
                onClick={handleClick}
                disabled={loading || selectedLanguageNames.length === 0}
                sx={{
                    textTransform: "none",
                    color: "error.main",
                    "&:hover": {
                        backgroundColor: "error.light",
                        color: "error.dark",
                    },
                }}
            >
                {selectedLanguageNames.length > 0
                    ? `Delete ${selectedLanguageNames.length} language${selectedLanguageNames.length !== 1 ? "s" : ""}`
                    : "Delete"}
            </Button>
        );
    }

    return (
        <Button
            variant="text"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleClick}
            disabled={loading}
            sx={{
                textTransform: "none",
                color: "error.main",
                "&:hover": {
                    backgroundColor: "error.light",
                    color: "error.dark",
                },
            }}
        >
            Delete
        </Button>
    );
};

