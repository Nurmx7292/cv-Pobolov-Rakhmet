import { Stack, Typography } from "@mui/material";
import type { SkillMasteryMock } from "@widgets/skills";
import { SkillsSection } from "@widgets/skills";

export interface UserSkillsMock {
    id: string;
    fullName: string;
    skills: SkillMasteryMock[];
}

interface UserSkillsLayoutProps {
    user: UserSkillsMock;
    isEditable?: boolean;
    onAddSkill?: () => void;
    onUpdateSkill?: (skill: SkillMasteryMock) => void;
    onDeleteSkills?: (skillIds: string[]) => void;
}

export const UserSkillsLayout = ({
    user,
    isEditable = true,
    onAddSkill,
    onUpdateSkill,
    onDeleteSkills,
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
                onAddSkill={onAddSkill}
                onUpdateSkill={onUpdateSkill}
                onDeleteSkills={onDeleteSkills}
            />
        </Stack>
    );
};


