import { CreateButton } from "@shared/ui/btn/CreateButton";
import { AddCvSkillDialog } from "../AddCvSkillDialog/AddCvSkillDialog";

interface AddCvSkillButtonProps {
    existingSkillNames: string[];
    onSubmit: (name: string, categoryId: string, mastery: string) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
    variant?: "primary" | "secondary";
}

export const AddCvSkillButton = ({
    existingSkillNames,
    onSubmit,
    loading = false,
    error,
    variant = "primary",
}: AddCvSkillButtonProps) => {
    return (
        <CreateButton
            entityName="skill"
            actionName="Add"
            variant={variant}
            renderDialog={({ open, onClose }) => (
                <AddCvSkillDialog
                    open={open}
                    onClose={onClose}
                    existingSkillNames={existingSkillNames}
                    onSubmit={async (name, categoryId, mastery) => {
                        await onSubmit(name, categoryId, mastery);
                        onClose();
                    }}
                    loading={loading}
                    error={error}
                />
            )}
        />
    );
};

