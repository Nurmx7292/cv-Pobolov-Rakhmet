import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProfileSkills, type ProfileSkill } from "@entities/profile";
import type { SkillMasteryMock } from "@widgets/skills";
import { UserSkillsLayout, type UserSkillsMock } from "@widgets/users";

export const UserSkillsPage = () => {
    const { userId } = useParams();
    const { data, loading, error, refetch } = useProfileSkills(userId);

    const skills = useMemo<SkillMasteryMock[]>(() => {
        if (!data?.profile?.skills) {
            return [];
        }

        return data.profile.skills.map((skill: ProfileSkill) => ({
            id: skill.id,
            name: skill.name,
            mastery: skill.mastery,
            category: skill.category?.name ?? "Other",
        }));
    }, [data?.profile?.skills]);

    const user = useMemo<UserSkillsMock | null>(() => {
        if (!data?.profile || !userId) {
            return null;
        }

        return {
            id: data.profile.id,
            fullName: data.profile.full_name ?? "Unnamed user",
            skills,
        };
    }, [data?.profile, skills, userId]);

    const handleAddSkill = useCallback(() => {
        console.info("Add skill action");
        void refetch();
    }, [refetch]);

    const handleUpdateSkill = useCallback(
        (skill: SkillMasteryMock) => {
            console.info("Update skill", skill);
            void refetch();
        },
        [refetch],
    );

    const handleDeleteSkills = useCallback(
        (ids: string[]) => {
            console.info("Delete skills", ids);
            void refetch();
        },
        [refetch],
    );

    if (loading) {
        return <div>Loading skills...</div>;
    }

    if (error) {
        return <div>Failed to load skills: {error.message}</div>;
    }

    if (!user) {
        return <div>Profile not found</div>;
    }

    return (
        <UserSkillsLayout
            user={user}
            isEditable
            onAddSkill={handleAddSkill}
            onUpdateSkill={handleUpdateSkill}
            onDeleteSkills={handleDeleteSkills}
        />
    );
};

