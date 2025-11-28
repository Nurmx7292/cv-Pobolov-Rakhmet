import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { SkillMasteryMock } from "@widgets/skills";
import { UserSkillsLayout, type UserSkillsMock } from "@widgets/users";

const buildMockSkills = (): SkillMasteryMock[] => [
    {
        id: "typescript",
        name: "TypeScript",
        category: "Programming languages",
        mastery: 90,
    },
    {
        id: "javascript",
        name: "JavaScript",
        category: "Programming languages",
        mastery: 85,
    },
    {
        id: "react",
        name: "React",
        category: "Frontend",
        mastery: 92,
    },
    {
        id: "css",
        name: "CSS3",
        category: "Frontend",
        mastery: 78,
    },
    {
        id: "scss",
        name: "SCSS",
        category: "Frontend",
        mastery: 82,
    },
    {
        id: "react-query",
        name: "React Query",
        category: "Frontend",
        mastery: 70,
    },
    {
        id: "redux",
        name: "Redux",
        category: "Frontend",
        mastery: 75,
    },
    {
        id: "storybook",
        name: "Storybook",
        category: "Frontend",
        mastery: 60,
    },
    {
        id: "nodejs",
        name: "Node.js",
        category: "Backend",
        mastery: 66,
    },
    {
        id: "nestjs",
        name: "NestJS",
        category: "Backend",
        mastery: 58,
    },
    {
        id: "keycloak",
        name: "Keycloak",
        category: "Backend",
        mastery: 55,
    },
    {
        id: "git",
        name: "Git",
        category: "Source control systems",
        mastery: 88,
    },
];

export const UserSkillsPage = () => {
    const { userId } = useParams();

    const mockUser = useMemo<UserSkillsMock>(() => {
        return {
            id: userId ?? "demo-user",
            fullName: "Rostislav Harlanov",
            skills: buildMockSkills(),
        };
    }, [userId]);

    const handleAddSkill = useCallback(() => {
        console.info("Add skill action");
    }, []);

    const handleUpdateSkill = useCallback((skill: SkillMasteryMock) => {
        console.info("Update skill", skill);
    }, []);

    const handleDeleteSkills = useCallback((ids: string[]) => {
        console.info("Delete skills", ids);
    }, []);

    return (
        <UserSkillsLayout
            user={mockUser}
            isEditable
            onAddSkill={handleAddSkill}
            onUpdateSkill={handleUpdateSkill}
            onDeleteSkills={handleDeleteSkills}
        />
    );
};

