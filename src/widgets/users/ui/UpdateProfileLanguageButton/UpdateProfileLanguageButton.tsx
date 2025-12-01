import { UpdateSelectorButton } from "@shared/ui";
import { UpdateProfileLanguageDialog } from "../UpdateProfileLanguageDialog/UpdateProfileLanguageDialog";
import type { ReactNode } from "react";

interface UpdateProfileLanguageButtonProps {
    languageName: string;
    proficiency: string;
    onSubmit: (proficiency: string) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
    children: ReactNode;
}

export const UpdateProfileLanguageButton = ({
    languageName,
    proficiency,
    onSubmit,
    loading = false,
    error,
    children,
}: UpdateProfileLanguageButtonProps) => {
    return (
        <UpdateSelectorButton
            renderDialog={({ open, onClose }) => (
                <UpdateProfileLanguageDialog
                    open={open}
                    onClose={onClose}
                    languageName={languageName}
                    initialProficiency={proficiency}
                    onSubmit={async (newProficiency) => {
                        await onSubmit(newProficiency);
                        onClose();
                    }}
                    loading={loading}
                    error={error}
                />
            )}
        >
            {children}
        </UpdateSelectorButton>
    );
};

