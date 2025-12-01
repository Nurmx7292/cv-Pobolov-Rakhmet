import { useMemo } from "react";
import { Stack, Typography, Grid } from "@mui/material";
import { SkillProgress } from "@features/skills";
import { useSkillCategories } from "@entities/skill";
import type { CvSkill } from "@entities/cv";

interface ProfessionalSkillsProps {
    skills: CvSkill[];
}

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

export const ProfessionalSkills = ({ skills }: ProfessionalSkillsProps) => {
    const { data: categoriesData } = useSkillCategories();

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

    const groupedSkills = useMemo(() => {
        return skills.reduce<Record<string, CvSkill[]>>((acc, skill) => {
            const categoryKey = skill.categoryId && categoryMap[skill.categoryId]
                ? categoryMap[skill.categoryId]
                : "Other";
            if (!acc[categoryKey]) {
                acc[categoryKey] = [];
            }
            acc[categoryKey].push(skill);
            return acc;
        }, {});
    }, [skills, categoryMap]);

    if (skills.length === 0) {
        return (
            <Stack spacing={2} className="cv-skills">
                <Typography variant="h6" component="h3" className="cv-skills-title">
                    Professional Skills
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    No skills added yet.
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={4} className="cv-skills">
            <Typography variant="h6" component="h3" className="cv-skills-title">
                Professional Skills
            </Typography>
            {Object.entries(groupedSkills).map(([categoryName, categorySkills]) => (
                <Stack spacing={2} key={categoryName} className="cv-skills-category">
                    <Typography variant="subtitle1" component="h4" className="cv-skills-category-title">
                        {categoryName}
                    </Typography>
                    <Grid container columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
                        {categorySkills.map((skill) => (
                            <Grid key={skill.name} size={1} className="cv-skill-item">
                                <SkillProgress
                                    skillName={skill.name}
                                    mastery={masteryEnumToNumber(skill.mastery)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            ))}
        </Stack>
    );
};

