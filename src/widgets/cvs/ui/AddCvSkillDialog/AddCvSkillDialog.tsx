import { FormDialog } from "@shared/ui/dialog/FormDialog";
import { AddCvSkillForm } from "../AddCvSkillForm/AddCvSkillForm";

interface AddCvSkillDialogProps {
    open: boolean;
    onClose: () => void;
    existingSkillNames: string[];
    onSubmit: (name: string, categoryId: string, mastery: string) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const AddCvSkillDialog = ({
    open,
    onClose,
    existingSkillNames,
    onSubmit,
    loading = false,
    error,
}: AddCvSkillDialogProps) => {
    return (
        <FormDialog open={open} onClose={onClose} entityName="Skill" variant="add">
            <AddCvSkillForm
                existingSkillNames={existingSkillNames}
                onSubmit={onSubmit}
                onCancel={onClose}
                loading={loading}
                error={error}
            />
        </FormDialog>
    );
};

