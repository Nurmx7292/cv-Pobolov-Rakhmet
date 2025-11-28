import { Button, Stack } from "@mui/material";

interface FormButtonsProps {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    onCancel: () => void;
    maxWidth?: string;
}

export const FormButtons = ({
    title,
    loading,
    disabled,
    onCancel,
    maxWidth = "220px",
}: FormButtonsProps) => {
    return (
        <Stack direction="row" spacing={2} maxWidth={maxWidth} width="100%">
            <Button variant="outlined" onClick={onCancel} fullWidth>
                Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={disabled} fullWidth>
                {loading ? "Saving..." : title}
            </Button>
        </Stack>
    );
};


