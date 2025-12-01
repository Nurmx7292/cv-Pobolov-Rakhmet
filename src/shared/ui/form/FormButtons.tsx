import { Button, Stack } from "@mui/material";

interface FormButtonsProps {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    onCancel?: () => void;
    maxWidth?: string;
    fullWidth?: boolean;
}

export const FormButtons = ({
    title,
    loading,
    disabled,
    onCancel,
    maxWidth = "220px",
    fullWidth = false,
}: FormButtonsProps) => {
    return (
        <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
                justifyContent: "end",
                maxWidth: maxWidth || "100%",
                width: fullWidth ? "100%" : "auto",
            }}
        >
            {onCancel && (
                <Button variant="outlined" onClick={onCancel} fullWidth={fullWidth}>
                    Cancel
                </Button>
            )}
            <Button 
                type="submit" 
                variant="contained" 
                disabled={disabled || loading} 
                fullWidth={fullWidth}
            >
                {loading ? "Saving..." : title}
            </Button>
        </Stack>
    );
};


