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
                justifyContent: "flex-end",
                maxWidth: fullWidth ? (maxWidth || "100%") : "220px",
                width: fullWidth ? (maxWidth || "100%") : "auto",
                marginLeft: "auto",
                alignSelf: "flex-end",
            }}
        >
            {onCancel && (
                <Button 
                    variant="outlined" 
                    onClick={onCancel} 
                    sx={{ 
                        flex: fullWidth ? 1 : "none",
                        minWidth: fullWidth ? 0 : "auto",
                    }}
                >
                    Cancel
                </Button>
            )}
            <Button 
                type="submit" 
                variant="contained" 
                disabled={disabled || loading}
                sx={{ 
                    flex: fullWidth ? 1 : "none",
                    minWidth: fullWidth ? 0 : "auto",
                }}
            >
                {loading ? "Saving..." : title}
            </Button>
        </Stack>
    );
};


