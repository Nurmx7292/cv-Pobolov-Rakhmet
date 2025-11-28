import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { ReactNode } from "react";

interface CreateButtonProps {
    entityName: string;
    actionName?: string;
    variant?: "primary" | "secondary";
    renderDialog: (controls: { open: boolean; onClose: () => void }) => ReactNode;
}

export const CreateButton = ({
    entityName,
    actionName = "Add",
    variant = "primary",
    renderDialog,
}: CreateButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                startIcon={<AddIcon />}
                variant={variant === "primary" ? "contained" : "text"}
                color={variant === "primary" ? "primary" : "inherit"}
                onClick={handleOpen}
                sx={{
                    borderRadius: 999,
                    textTransform: "uppercase",
                }}
            >
                {actionName} {entityName}
            </Button>
            {renderDialog({ open, onClose: handleClose })}
        </>
    );
};


