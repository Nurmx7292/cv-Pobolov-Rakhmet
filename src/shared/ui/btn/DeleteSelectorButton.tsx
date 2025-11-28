import { Box, Button, Stack, Typography } from "@mui/material";

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
                startIcon={<Box component="span">🗑️</Box>}
            >
                Remove {entityName}s
            </Button>
        );
    }

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" onClick={() => onChange(false)}>
                Cancel
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={onSubmit}
                disabled={data.length < 1 || loading}
            >
                Delete ({data.length})
            </Button>
            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}
        </Stack>
    );
};


