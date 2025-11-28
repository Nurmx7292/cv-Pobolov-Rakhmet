import { CreateButton } from "@shared/ui";
import { AddProfileSkillDialog } from "../AddProfileSkillDialog";

interface AddProfileSkillButtonProps {
    userId: string;
    existingSkillIds: string[];
    onSubmit: (skillId: string, mastery: number) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const AddProfileSkillButton = ({
    userId,
    existingSkillIds,
    onSubmit,
    loading = false,
    error,
}: AddProfileSkillButtonProps) => {
    return (
        <CreateButton
            entityName="skill"
            actionName="Add"
            renderDialog={({ open, onClose }) => (
                <AddProfileSkillDialog
                    open={open}
                    onClose={onClose}
                    userId={userId}
                    existingSkillIds={existingSkillIds}
                    onSubmit={async (skillId, mastery) => {
                        await onSubmit(skillId, mastery);
                        onClose();
                    }}
                    loading={loading}
                    error={error}
                />
            )}
        />
    );
};

