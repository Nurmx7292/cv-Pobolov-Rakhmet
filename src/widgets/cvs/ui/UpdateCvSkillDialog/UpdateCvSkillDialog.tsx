import { FormDialog } from "@shared/ui/dialog/FormDialog";
import { ProfileSkillForm } from "@widgets/users/ui/ProfileSkillForm/ProfileSkillForm";

interface UpdateCvSkillDialogProps {
    open: boolean;
    onClose: () => void;
    skillName: string;
    initialMastery: number;
    onSubmit: (skillName: string, mastery: number) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const UpdateCvSkillDialog = ({
    open,
    onClose,
    skillName,
    initialMastery,
    onSubmit,
    loading = false,
    error,
}: UpdateCvSkillDialogProps) => {
    return (
        <FormDialog open={open} onClose={onClose} entityName="Skill" variant="update">
            <ProfileSkillForm
                skillId={skillName}
                initialMastery={initialMastery}
                onSubmit={onSubmit}
                onCancel={onClose}
                loading={loading}
                error={error}
            />
        </FormDialog>
    );
};

