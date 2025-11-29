import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface DeleteSelectorButtonProps<T> {
    data: T[];
    entityName: string;
    isDeleting: boolean;
    loading?: boolean;
    error?: string;
    onSubmit: () => void;
    onChange: (isDeleting: boolean) => void;
}

export const DeleteSelectorButton = <T,>({
    data,
    entityName,
    isDeleting,
    loading = false,
    error,
    onSubmit,
    onChange,
}: DeleteSelectorButtonProps<T>) => {
    if (!isDeleting) {
        return (
            <Button
                variant="text"
                color="error"
                onClick={() => onChange(true)}
                startIcon={<DeleteOutlineIcon />}
            >
                Remove {entityName}s
            </Button>
        );
    }

    return (
        <Stack direction="row" spacing={3}>
            <Button
                variant="text"
                onClick={() => onChange(false)}
                disabled={loading}
                sx={{ width: "15rem" }}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                onClick={onSubmit}
                disabled={data.length < 1 || loading}
                sx={{
                    backgroundColor: "error.main",
                    gap: "1.5rem",
                    width: "15rem",
                }}
            >
                Delete
                <Box
                    sx={{
                        width: "1.75rem",
                        height: "1.75rem",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        color: "error.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                    }}
                >
                    {data.length}
                </Box>
            </Button>
            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}
        </Stack>
    );
};


