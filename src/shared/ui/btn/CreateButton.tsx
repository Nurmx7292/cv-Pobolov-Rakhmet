import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

interface CreateButtonProps {
    entityName: string;
    actionName?: string;
    variant?: "primary" | "secondary";
    renderDialog: (controls: { open: boolean; onClose: () => void }) => ReactNode;
    sx?: SxProps<Theme>;
}

export const CreateButton = ({
    entityName,
    actionName = "Add",
    variant = "primary",
    renderDialog,
    sx,
}: CreateButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant="outlined"
                startIcon={
                    <AddIcon
                        sx={(theme) => ({
                            color: variant === "primary" ? theme.palette.primary.main : "#767676",
                        })}
                    />
                }
                onClick={handleOpen}
                sx={(theme) => ({
                    textTransform: "uppercase",
                    ...(variant === "primary"
                        ? {}
                        : {
                              color: "#767676",
                              width: "15rem",
                          }),
                    ...(typeof sx === "function" ? sx(theme) : sx),
                })}
            >
                {actionName} {entityName}
            </Button>
            {renderDialog({ open, onClose: handleClose })}
        </>
    );
};


