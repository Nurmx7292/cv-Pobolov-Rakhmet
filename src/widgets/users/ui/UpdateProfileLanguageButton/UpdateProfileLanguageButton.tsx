import { useState } from "react";
import { UpdateProfileLanguageDialog } from "../UpdateProfileLanguageDialog/UpdateProfileLanguageDialog";
import { LanguageProficiency } from "@features/languages";

interface UpdateProfileLanguageButtonProps {
    languageName: string;
    proficiency: string;
    onSubmit: (proficiency: string) => void;
    loading?: boolean;
}

export const UpdateProfileLanguageButton = ({
    languageName,
    proficiency,
    onSubmit,
    loading = false,
}: UpdateProfileLanguageButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (newProficiency: string) => {
        onSubmit(newProficiency);
        handleClose();
    };

    return (
        <>
            <div
                onClick={handleOpen}
                style={{ cursor: "pointer", width: "100%" }}
            >
                <LanguageProficiency
                    languageName={languageName}
                    proficiency={proficiency}
                />
            </div>
            <UpdateProfileLanguageDialog
                open={open}
                onClose={handleClose}
                languageName={languageName}
                initialProficiency={proficiency}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </>
    );
};

