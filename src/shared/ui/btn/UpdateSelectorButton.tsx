import { useState } from "react";
import type { ReactNode } from "react";

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
            <div role="button" tabIndex={0} onClick={handleOpen} onKeyDown={handleOpen}>
                {children}
            </div>
            {renderDialog({ open, onClose: handleClose })}
        </>
    );
};


