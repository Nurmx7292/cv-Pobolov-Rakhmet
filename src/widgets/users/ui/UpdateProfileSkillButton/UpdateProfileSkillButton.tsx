import { UpdateSelectorButton } from "@shared/ui";
import { UpdateProfileSkillDialog } from "../UpdateProfileSkillDialog";
import type { SkillMasteryMock } from "@widgets/skills";

interface UpdateProfileSkillButtonProps {
    skill: SkillMasteryMock;
    onSubmit: (skillId: string, mastery: number) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
    children: React.ReactNode;
}

export const UpdateProfileSkillButton = ({
    skill,
    onSubmit,
    loading = false,
    error,
    children,
}: UpdateProfileSkillButtonProps) => {
    return (
        <UpdateSelectorButton
            renderDialog={({ open, onClose }) => (
                <UpdateProfileSkillDialog
                    open={open}
                    onClose={onClose}
                    skillId={skill.name}
                    initialMastery={skill.mastery}
                    onSubmit={async (skillName, mastery) => {
                        await onSubmit(skillName, mastery);
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

