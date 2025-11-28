import { Stack, Typography, Button } from "@mui/material";
import type { SkillMasteryMock } from "@widgets/skills";
import { SkillsSection } from "@widgets/skills";
import { AddProfileSkillButton, UpdateProfileSkillButton } from "@widgets/users";
import type { Error } from "@apollo/client";

export interface UserSkillsMock {
    id: string;
    fullName: string;
    skills: SkillMasteryMock[];
}

interface UserSkillsLayoutProps {
    user: UserSkillsMock;
    isEditable?: boolean;
    userId: string;
    existingSkillIds: string[];
    onAddSkill: (skillId: string, mastery: number) => Promise<void>;
    onUpdateSkill: (skillId: string, mastery: number) => Promise<void>;
    onDeleteSkills?: (skillIds: string[]) => void;
    adding?: boolean;
    updating?: boolean;
    addError?: Error | null;
    updateError?: Error | null;
}

export const UserSkillsLayout = ({
    user,
    isEditable = true,
    userId,
    existingSkillIds,
    onAddSkill,
    onUpdateSkill,
    onDeleteSkills,
    adding = false,
    updating = false,
    addError,
    updateError,
}: UserSkillsLayoutProps) => {
    return (
        <Stack spacing={3} padding={{ xs: 2, md: 4 }}>
            <Stack spacing={0.5}>
                <Typography variant="h4" component="h1">
                    Skills
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {user.fullName}
                </Typography>
            </Stack>
            <SkillsSection
                title="Skill overview"
                skills={user.skills}
                isEditable={isEditable}
                renderAddButton={() => (
                    <AddProfileSkillButton
                        userId={userId}
                        existingSkillIds={existingSkillIds}
                        onSubmit={onAddSkill}
                        loading={adding}
                        error={addError}
                    />
                )}
                renderUpdateButton={(skill) => (
                    <UpdateProfileSkillButton
                        skill={skill}
                        onSubmit={onUpdateSkill}
                        loading={updating}
                        error={updateError}
                    >
                        <Button size="small" variant="text">
                            Update mastery
                        </Button>
                    </UpdateProfileSkillButton>
                )}
                onDeleteSkills={onDeleteSkills}
            />
        </Stack>
    );
};


