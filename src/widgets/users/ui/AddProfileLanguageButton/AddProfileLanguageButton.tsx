import { CreateButton } from "@shared/ui";
import { AddProfileLanguageDialog } from "../AddProfileLanguageDialog/AddProfileLanguageDialog";

interface AddProfileLanguageButtonProps {
    onSubmit: (name: string, proficiency: string) => Promise<void>;
    existingLanguageNames?: string[];
    loading?: boolean;
    error?: Error | null;
    variant?: "primary" | "secondary";
}

export const AddProfileLanguageButton = ({
    onSubmit,
    existingLanguageNames = [],
    loading = false,
    error,
    variant = "primary",
}: AddProfileLanguageButtonProps) => {
    return (
        <CreateButton
            entityName="language"
            actionName="Add"
            variant={variant}
            renderDialog={({ open, onClose }) => (
                <AddProfileLanguageDialog
                    open={open}
                    onClose={onClose}
                    onSubmit={async (name, proficiency) => {
                        await onSubmit(name, proficiency);
                        onClose();
                    }}
                    existingLanguageNames={existingLanguageNames}
                    loading={loading}
                    error={error}
                />
            )}
        />
    );
};

