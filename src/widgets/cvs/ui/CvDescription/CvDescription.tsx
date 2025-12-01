import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSkillCategories } from "@entities/skill";
import type { Cv } from "@entities/cv";
import { CvReviewSection } from "../CvReviewSection/CvReviewSection";
import { LabeledText } from "../LabeledText/LabeledText";

interface CvDescriptionProps {
    cv: Cv;
}

export const CvDescription = ({ cv }: CvDescriptionProps) => {
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

    const skillChart = useMemo(() => {
        return cv.skills.reduce<Record<string, Array<{ name: string }>>>((acc, skill) => {
            const categoryName = skill.categoryId && categoryMap[skill.categoryId]
                ? categoryMap[skill.categoryId]
                : "Other";
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push({ name: skill.name });
            return acc;
        }, {});
    }, [cv.skills, categoryMap]);

    const skillChartEntries = Object.entries(skillChart);

    return (
        <Box sx={{ breakAfter: "page" }}>
            <CvReviewSection
                left={
                    <>
                        <LabeledText label="Education" sx={{ mt: "1rem" }}>
                            {cv.education}
                        </LabeledText>
                        <LabeledText label="Language proficiency">
                            <Stack gap={0.5}>
                                {cv.languages.map((lang) => (
                                    <Typography
                                        key={`${lang.name}-${lang.proficiency}`}
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                            "@media print": {
                                                color: theme.palette.secondary.main,
                                            },
                                        })}
                                    >
                                        {lang.name} - {lang.proficiency}
                                    </Typography>
                                ))}
                            </Stack>
                        </LabeledText>
                    </>
                }
                right={
                    <>
                        <LabeledText label={cv.name} sx={{ mt: "1rem" }}>
                            {cv.description}
                        </LabeledText>
                        {skillChartEntries.map(([name, skills], index) => (
                            <LabeledText
                                key={name}
                                label={name}
                                sx={{
                                    mb: index === skillChartEntries.length - 1 ? "1rem" : "unset",
                                }}
                            >
                                {skills.map((s) => s.name).join(", ")}
                            </LabeledText>
                        ))}
                    </>
                }
            />
        </Box>
    );
};
