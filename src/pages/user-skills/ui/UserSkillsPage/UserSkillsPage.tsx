import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProfileSkills, useAddProfileSkill, useUpdateProfileSkill, type ProfileSkill } from "@entities/profile";
import { useNotification } from "@shared/lib/notifications";
import type { SkillMasteryMock } from "@widgets/skills";
import { UserSkillsLayout, type UserSkillsMock } from "@widgets/users";

export const UserSkillsPage = () => {
    const { userId } = useParams();
    const { data, loading, error, refetch } = useProfileSkills(userId);
    const [addProfileSkill, { loading: adding, error: addError }] = useAddProfileSkill();
    const [updateProfileSkill, { loading: updating, error: updateError }] = useUpdateProfileSkill();
    const notify = useNotification();

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

    const existingSkillIds = useMemo(() => skills.map((skill) => skill.id), [skills]);

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

    const handleAddSkill = useCallback(
        async (skillId: string, mastery: number) => {
            try {
                await addProfileSkill({
                    variables: { skillId, mastery },
                });
                notify("Skill was added", "success");
                await refetch();
            } catch (err) {
                notify("Failed to add skill", "error");
            }
        },
        [addProfileSkill, notify, refetch],
    );

    const handleUpdateSkill = useCallback(
        async (skillId: string, mastery: number) => {
            try {
                await updateProfileSkill({
                    variables: { skillId, mastery },
                });
                notify("Skill was updated", "success");
                await refetch();
            } catch (err) {
                notify("Failed to update skill", "error");
            }
        },
        [updateProfileSkill, notify, refetch],
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

    if (!user || !userId) {
        return <div>Profile not found</div>;
    }

    return (
        <UserSkillsLayout
            user={user}
            isEditable
            userId={userId}
            existingSkillIds={existingSkillIds}
            onAddSkill={handleAddSkill}
            onUpdateSkill={handleUpdateSkill}
            onDeleteSkills={handleDeleteSkills}
            adding={adding}
            updating={updating}
            addError={addError}
            updateError={updateError}
        />
    );
};

