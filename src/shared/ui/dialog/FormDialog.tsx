import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";

type DialogVariant = "add" | "update" | "delete";

const variantDictionary: Record<DialogVariant, string> = {
    add: "Add",
    update: "Update",
    delete: "Delete",
};

interface FormDialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    entityName: string;
    variant?: DialogVariant;
    fullWidth?: boolean;
    maxWidth?: "xs" | "sm" | "md" | "lg";
}

export const FormDialog = ({
    open,
    onClose,
    children,
    entityName,
    variant = "add",
    fullWidth = true,
    maxWidth = "sm",
}: FormDialogProps) => {
    const title = `${variantDictionary[variant]} ${entityName}`.trim();

    return (
        <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" component="span">
                    {title}
                </Typography>
                <IconButton aria-label="close" onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ paddingX: "1rem" }}>{children}</DialogContent>
        </Dialog>
    );
};


