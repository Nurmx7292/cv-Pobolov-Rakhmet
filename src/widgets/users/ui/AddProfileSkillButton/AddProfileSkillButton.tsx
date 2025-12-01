import { CreateButton } from "@shared/ui";
import { AddProfileSkillDialog } from "../AddProfileSkillDialog";

interface AddProfileSkillButtonProps {
    existingSkillIds: string[];
    onSubmit: (name: string, categoryId: string, mastery: number) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
    variant?: "primary" | "secondary";
}

export const AddProfileSkillButton = ({
    existingSkillIds,
    onSubmit,
    loading = false,
    error,
    variant = "primary",
}: AddProfileSkillButtonProps) => {
    return (
        <CreateButton
            entityName="skill"
            actionName="Add"
            variant={variant}
            renderDialog={({ open, onClose }) => (
                <AddProfileSkillDialog
                    open={open}
                    onClose={onClose}
                    existingSkillIds={existingSkillIds}
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

