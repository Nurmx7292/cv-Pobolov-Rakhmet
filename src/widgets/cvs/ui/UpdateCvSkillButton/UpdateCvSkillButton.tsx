import { UpdateSelectorButton } from "@shared/ui/btn/UpdateSelectorButton";
import { UpdateCvSkillDialog } from "../UpdateCvSkillDialog/UpdateCvSkillDialog";
import type { ReactNode } from "react";

interface UpdateCvSkillButtonProps {
    skillName: string;
    mastery: number;
    onSubmit: (skillName: string, mastery: number) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
    children: ReactNode;
}

export const UpdateCvSkillButton = ({
    skillName,
    mastery,
    onSubmit,
    loading = false,
    error,
    children,
}: UpdateCvSkillButtonProps) => {
    return (
        <UpdateSelectorButton
            renderDialog={({ open, onClose }) => (
                <UpdateCvSkillDialog
                    open={open}
                    onClose={onClose}
                    skillName={skillName}
                    initialMastery={mastery}
                    onSubmit={async (name, masteryValue) => {
                        await onSubmit(name, masteryValue);
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

