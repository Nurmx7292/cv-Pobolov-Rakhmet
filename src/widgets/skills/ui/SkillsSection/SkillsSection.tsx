import { useMemo, useState, type ReactNode } from "react";
import {
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { SkillProgress } from "@features/skills";
import { SelectorButton } from "@shared/ui";
import { DeleteSelectorButton } from "@shared/ui";
import type { SkillMasteryMock } from "../../model/types";

interface SkillsSectionProps {
    title?: string;
    skills: SkillMasteryMock[];
    isEditable?: boolean;
    renderAddButton?: () => ReactNode;
    renderUpdateButton?: (skill: SkillMasteryMock) => ReactNode;
    onDeleteSkills?: (skillIds: string[]) => void;
}

const useSkillsByCategory = (skills: SkillMasteryMock[]) => {
    return useMemo(() => {
        return skills.reduce<Record<string, SkillMasteryMock[]>>((acc, skill) => {
            const categoryKey = skill.category || "Other";
            if (!acc[categoryKey]) {
                acc[categoryKey] = [];
            }
            acc[categoryKey].push(skill);
            return acc;
        }, {});
    }, [skills]);
};

export const SkillsSection = ({
    title = "Skills",
    skills,
    isEditable = false,
    renderAddButton,
    renderUpdateButton,
    onDeleteSkills,
}: SkillsSectionProps) => {
    const groupedSkills = useSkillsByCategory(skills);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelection = (skillId: string) => {
        setSelectedIds((prev) =>
            prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId],
        );
    };

    const handleDelete = () => {
        if (!selectedIds.length) {
            setIsDeleting(false);
            return;
        }

        onDeleteSkills?.(selectedIds);
        setSelectedIds([]);
        setIsDeleting(false);
    };

    return (
        <Stack sx={{ alignItems: "center", px: "1.25rem" }}>
            <Stack maxWidth="900px" spacing={6} width="100%">
                <Stack spacing={4}>
                    {Object.entries(groupedSkills).map(([categoryName, categorySkills]) => (
                        <Stack spacing={2} key={categoryName}>
                            <Typography variant="subtitle1" component="h2">
                                {categoryName}
                            </Typography>
                            <Grid container columns={{ xs: 1, sm: 2, lg: 3 }}>
                                {categorySkills.map((skill) => (
                                    <Grid
                                        key={skill.id}
                                        size={1}
                                        sx={{ minWidth: "17rem", padding: "0.75rem 1rem" }}
                                    >
                                        {isDeleting ? (
                                            <SelectorButton
                                                isSelected={selectedIds.includes(skill.id)}
                                                onClick={() => toggleSelection(skill.id)}
                                            >
                                                <SkillProgress 
                                                    skillName={skill.name} 
                                                    mastery={skill.mastery}
                                                    isSelected={selectedIds.includes(skill.id)}
                                                />
                                            </SelectorButton>
                                        ) : isEditable && renderUpdateButton ? (
                                            renderUpdateButton(skill)
                                        ) : (
                                            <SkillProgress skillName={skill.name} mastery={skill.mastery} />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    ))}
                </Stack>
                {isEditable && (
                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        {!isDeleting && renderAddButton && renderAddButton()}
                        <DeleteSelectorButton
                            data={selectedIds}
                            entityName="skill"
                            isDeleting={isDeleting}
                            loading={false}
                            onSubmit={handleDelete}
                            onChange={setIsDeleting}
                        />
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};


