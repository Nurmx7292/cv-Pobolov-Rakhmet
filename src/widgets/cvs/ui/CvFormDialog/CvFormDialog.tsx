import { FormDialog } from "@shared/ui/dialog/FormDialog";
import type { ReactNode } from "react";

interface CvFormDialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    variant?: "add" | "update";
}

export const CvFormDialog = ({
    open,
    onClose,
    children,
    variant = "add",
}: CvFormDialogProps) => {
    return (
        <FormDialog
            open={open}
            onClose={onClose}
            entityName="CV"
            variant={variant}
        >
            {children}
        </FormDialog>
    );
};

