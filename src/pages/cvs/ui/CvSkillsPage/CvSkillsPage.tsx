import { useOutletContext, useParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import { Stack, Typography, Box } from "@mui/material";
import {
    AddCvSkillButton,
    UpdateCvSkillButton,
    DeleteCvSkillButton,
    type CvPageContextValue,
} from "@widgets/cvs";
import { SkillsSection } from "@widgets/skills";
import { SkillProgress } from "@features/skills";
import {
    useAddCvSkill,
    useUpdateCvSkill,
    useDeleteCvSkill,
} from "@entities/cv";
import { useSkillCategories } from "@entities/skill";
import { masteryNumberToEnum } from "@features/skills";
import { useNotification } from "@shared/lib/notifications";
import type { SkillMasteryMock } from "@widgets/skills";

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

export const CvSkillsPage = () => {
    const { cv, refetch } = useOutletContext<CvPageContextValue>();
    const { cvId } = useParams<{ cvId: string }>();
    const [addCvSkill, { loading: adding, error: addError }] = useAddCvSkill();
    const [updateCvSkill, { loading: updating, error: updateError }] = useUpdateCvSkill();
    const [deleteCvSkill, { loading: deleting, error: deleteError }] = useDeleteCvSkill();
    const { data: categoriesData } = useSkillCategories();
    const { showNotification, NotificationComponent } = useNotification();

    const currentUserId = localStorage.getItem("currentUserId");
    const isEditable = cv?.user?.id === currentUserId;

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
        if (!cv?.skills) {
            return [];
        }

        return cv.skills.map((skill) => {
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
    }, [cv?.skills, categoryMap]);

    const existingSkillNames = useMemo(() => {
        return skills.map((skill) => skill.name);
    }, [skills]);

    const handleAddSkill = useCallback(
        async (name: string, categoryId: string, mastery: string) => {
            if (!cvId) return;
            try {
                await addCvSkill({
                    variables: {
                        cvId,
                        name,
                        categoryId: categoryId || undefined,
                        mastery,
                    },
                });
                await refetch();
                showNotification("Skill was added", "success");
            } catch (err) {
                console.error("Failed to add skill:", err);
                showNotification("Failed to add skill", "error");
            }
        },
        [addCvSkill, refetch, cvId, showNotification],
    );

    const handleUpdateSkill = useCallback(
        async (skillName: string, mastery: number) => {
            if (!cvId || !cv) return;
            const skill = cv.skills.find((s) => s.name === skillName);
            if (!skill) return;

            const masteryEnum = masteryNumberToEnum(mastery);
            try {
                await updateCvSkill({
                    variables: {
                        cvId,
                        name: skillName,
                        categoryId: skill.categoryId || undefined,
                        mastery: masteryEnum,
                    },
                });
                await refetch();
                showNotification("Skill was updated", "success");
            } catch (err) {
                console.error("Failed to update skill:", err);
                showNotification("Failed to update skill", "error");
            }
        },
        [updateCvSkill, refetch, cvId, cv, showNotification],
    );

    const handleDeleteSkills = useCallback(
        async (skillNames: string[]) => {
            if (!cvId || !skillNames.length) return;
            try {
                await deleteCvSkill({
                    variables: {
                        cvId,
                        name: skillNames,
                    },
                });
                await refetch();
                showNotification("Skill was deleted", "success");
            } catch (err) {
                console.error("Failed to delete skills:", err);
                showNotification("Failed to delete skill", "error");
            }
        },
        [deleteCvSkill, refetch, cvId, showNotification],
    );

    if (!cv) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6">CV not found</Typography>
            </Box>
        );
    }

    return (
        <>
            <Stack spacing={3} sx={{ p: 3 }}>
                <SkillsSection
                    skills={skills}
                    isEditable={isEditable}
                    renderAddButton={() => (
                        <AddCvSkillButton
                            existingSkillNames={existingSkillNames}
                            onSubmit={handleAddSkill}
                            loading={adding}
                            error={addError}
                            variant="secondary"
                        />
                    )}
                    renderUpdateButton={(skill) => (
                        <UpdateCvSkillButton
                            skillName={skill.name}
                            mastery={skill.mastery}
                            onSubmit={handleUpdateSkill}
                            loading={updating}
                            error={updateError}
                        >
                            <SkillProgress skillName={skill.name} mastery={skill.mastery} />
                        </UpdateCvSkillButton>
                    )}
                    onDeleteSkills={handleDeleteSkills}
                />
            </Stack>
            <NotificationComponent />
        </>
    );
};

