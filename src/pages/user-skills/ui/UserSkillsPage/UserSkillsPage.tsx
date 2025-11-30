import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProfileSkills, useAddProfileSkill, useUpdateProfileSkill, useDeleteProfileSkill, type ProfileSkill } from "@entities/profile";
import { useSkillOptions, useSkillCategories, type SkillOption } from "@entities/skill";
import { masteryNumberToEnum } from "@features/skills";
import { useNotification } from "@shared/lib/notifications";
import type { SkillMasteryMock } from "@widgets/skills";
import { UserSkillsLayout, type UserSkillsMock } from "@widgets/users";

export const UserSkillsPage = () => {
    const { userId } = useParams();
    const { data, loading, error, refetch } = useProfileSkills(userId);
    const [addProfileSkill, { loading: adding, error: addError }] = useAddProfileSkill();
    const [updateProfileSkill, { loading: updating, error: updateError }] = useUpdateProfileSkill();
    const [deleteProfileSkill, { loading: deleting, error: deleteError }] = useDeleteProfileSkill();
    const { skillsMap, loading: skillsLoading } = useSkillOptions();
    const { data: categoriesData } = useSkillCategories();
    const notify = useNotification();
    
    const masteryEnumToNumber = (enumValue: string): number => {
        const map: Record<string, number> = {
            Novice: 20,
            Advanced: 40,
            Competent: 60,
            Proficient: 80,
            Expert: 100,
        };
        return map[enumValue] || 20;
    };

    const categoryMap = useMemo(() => {
        if (!categoriesData?.skillCategories) {
            return {};
        }
        const map: Record<string, string> = {};
        categoriesData.skillCategories.forEach((cat) => {
            map[cat.id] = cat.name;
        });
        return map;
    }, [categoriesData]);

    const skills = useMemo<SkillMasteryMock[]>(() => {
        if (!data?.profile?.skills) {
            return [];
        }

        return data.profile.skills.map((skill: ProfileSkill) => {
            const categoryName = skill.categoryId && categoryMap[skill.categoryId]
                ? categoryMap[skill.categoryId]
                : "Other";
            
            return {
                id: skill.name,
                name: skill.name,
                mastery: masteryEnumToNumber(skill.mastery),
                category: categoryName,
            };
        });
    }, [data?.profile?.skills, categoryMap]);

    const existingSkillIds = useMemo(() => {
        const skillNames = skills.map((skill) => skill.name);
        return (Object.values(skillsMap) as SkillOption[])
            .filter((skill) => skillNames.includes(skill.name))
            .map((skill) => skill.id);
    }, [skills, skillsMap]);

    const user = useMemo<UserSkillsMock | null>(() => {
        if (!data?.profile || !userId) {
            return null;
        }

        return {
            id: data.profile.id,
            fullName: data.profile.full_name ?? "",
            skills,
        };
    }, [data?.profile, skills, userId]);

    const handleAddSkill = useCallback(
        async (name: string, categoryId: string, mastery: number) => {
            if (!userId) return;

            try {
                await addProfileSkill({
                    variables: {
                        userId,
                        name,
                        categoryId: categoryId === "-1" ? undefined : categoryId,
                        mastery: masteryNumberToEnum(mastery),
                    },
                });
                notify("Skill was added", "success");
                await refetch();
            } catch (err) {
                notify("Failed to add skill", "error");
            }
        },
        [addProfileSkill, notify, refetch, userId],
    );

    const handleUpdateSkill = useCallback(
        async (skillName: string, mastery: number) => {
            if (!userId) return;
            try {
                await updateProfileSkill({
                    variables: {
                        userId,
                        name: skillName,
                        mastery: masteryNumberToEnum(mastery),
                    },
                });
                notify("Skill was updated", "success");
                await refetch();
            } catch (err) {
                notify("Failed to update skill", "error");
            }
        },
        [updateProfileSkill, notify, refetch, userId],
    );

    const handleDeleteSkills = useCallback(
        async (skillNames: string[]) => {
            if (!userId || !skillNames.length) return;
            try {
                await deleteProfileSkill({
                    variables: {
                        userId,
                        name: skillNames,
                    },
                });
                notify("Skill was deleted", "success");
                await refetch();
            } catch (err) {
                notify("Failed to delete skill", "error");
            }
        },
        [deleteProfileSkill, notify, refetch, userId],
    );

    if (loading || skillsLoading) {
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
            existingSkillIds={existingSkillIds}
            onAddSkill={handleAddSkill}
            onUpdateSkill={handleUpdateSkill}
            onDeleteSkills={handleDeleteSkills}
            adding={adding}
            updating={updating}
            deleting={deleting}
            addError={addError}
            updateError={updateError}
            deleteError={deleteError}
        />
    );
};

