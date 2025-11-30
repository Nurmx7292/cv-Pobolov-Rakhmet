import { useState } from "react";
import type { ReactNode } from "react";
import { SelectorButton } from "./SelectorButton";

interface UpdateSelectorButtonProps {
    children: ReactNode;
    renderDialog: (controls: { open: boolean; onClose: () => void }) => ReactNode;
}

export const UpdateSelectorButton = ({ children, renderDialog }: UpdateSelectorButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <SelectorButton onClick={handleOpen}>
                {children}
            </SelectorButton>
            {renderDialog({ open, onClose: handleClose })}
        </>
    );
};


