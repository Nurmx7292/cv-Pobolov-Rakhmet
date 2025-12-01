import { Stack, Typography } from "@mui/material";
import type { SkillMasteryMock } from "@widgets/skills";
import { SkillsSection } from "@widgets/skills";
import { SkillProgress } from "@features/skills";
import { AddProfileSkillButton, UpdateProfileSkillButton } from "@widgets/users";

export interface UserSkillsMock {
    id: string;
    fullName: string;
    skills: SkillMasteryMock[];
}

interface UserSkillsLayoutProps {
    user: UserSkillsMock;
    isEditable?: boolean;
    existingSkillIds: string[];
    onAddSkill: (name: string, categoryId: string, mastery: number) => Promise<void>;
    onUpdateSkill: (skillId: string, mastery: number) => Promise<void>;
    onDeleteSkills?: (skillIds: string[]) => void;
    adding?: boolean;
    updating?: boolean;
    deleting?: boolean;
    addError?: Error | null;
    updateError?: Error | null;
    deleteError?: Error | null;
}

export const UserSkillsLayout = ({
    user,
    isEditable = true,
    existingSkillIds,
    onAddSkill,
    onUpdateSkill,
    onDeleteSkills,
    adding = false,
    updating = false,
    deleting = false,
    addError,
    updateError,
    deleteError,
}: UserSkillsLayoutProps) => {
    return (
        <Stack spacing={3} padding={{ xs: 2, md: 4 }}>
            <Typography variant="h6" component="h1">
                Skills
            </Typography>
            <SkillsSection
                skills={user.skills}
                isEditable={isEditable}
                renderAddButton={() => (
                    <AddProfileSkillButton
                        existingSkillIds={existingSkillIds}
                        onSubmit={onAddSkill}
                        loading={adding}
                        error={addError}
                        variant="secondary"
                    />
                )}
                renderUpdateButton={(skill) => (
                    <UpdateProfileSkillButton
                        skill={skill}
                        onSubmit={onUpdateSkill}
                        loading={updating}
                        error={updateError}
                    >
                        <SkillProgress skillName={skill.name} mastery={skill.mastery} />
                    </UpdateProfileSkillButton>
                )}
                onDeleteSkills={onDeleteSkills}
            />
        </Stack>
    );
};


