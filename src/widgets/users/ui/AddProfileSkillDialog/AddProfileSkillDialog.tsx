import { FormDialog } from "@shared/ui";
import { AddProfileSkillForm } from "../AddProfileSkillForm";

interface AddProfileSkillDialogProps {
    open: boolean;
    onClose: () => void;
    existingSkillIds: string[];
    onSubmit: (name: string, categoryId: string, mastery: number) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const AddProfileSkillDialog = ({
    open,
    onClose,
    existingSkillIds,
    onSubmit,
    loading = false,
    error,
}: AddProfileSkillDialogProps) => {
    return (
        <FormDialog open={open} onClose={onClose} entityName="Skill" variant="add">
            <AddProfileSkillForm
                existingSkillIds={existingSkillIds}
                onSubmit={onSubmit}
                onCancel={onClose}
                loading={loading}
                error={error}
            />
        </FormDialog>
    );
};

