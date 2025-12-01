import { FormDialog } from "@shared/ui";
import { ProfileSkillForm } from "../ProfileSkillForm";

interface UpdateProfileSkillDialogProps {
    open: boolean;
    onClose: () => void;
    skillId: string;
    initialMastery: number;
    onSubmit: (skillId: string, mastery: number) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const UpdateProfileSkillDialog = ({
    open,
    onClose,
    skillId,
    initialMastery,
    onSubmit,
    loading = false,
    error,
}: UpdateProfileSkillDialogProps) => {
    return (
        <FormDialog open={open} onClose={onClose} entityName="Skill" variant="update">
            <ProfileSkillForm
                skillId={skillId}
                initialMastery={initialMastery}
                onSubmit={onSubmit}
                onCancel={onClose}
                loading={loading}
                error={error}
            />
        </FormDialog>
    );
};

