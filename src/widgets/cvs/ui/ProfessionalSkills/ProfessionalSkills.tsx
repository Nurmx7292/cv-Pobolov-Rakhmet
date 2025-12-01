import { useMemo } from "react";
import { Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, Box } from "@mui/material";
import { useSkillCategories } from "@entities/skill";
import { useTheme } from "@mui/material/styles";
import type { CvSkill } from "@entities/cv";

interface ProfessionalSkillsProps {
    skills: CvSkill[];
}

interface SkillRow {
    name: string;
    skills: string[];
}

export const ProfessionalSkills = ({ skills }: ProfessionalSkillsProps) => {
    const theme = useTheme();
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
        return skills.reduce<Record<string, Array<{ name: string }>>>((acc, skill) => {
            const categoryName = skill.categoryId && categoryMap[skill.categoryId]
                ? categoryMap[skill.categoryId]
                : "Other";
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push({ name: skill.name });
            return acc;
        }, {});
    }, [skills, categoryMap]);

    const rows: SkillRow[] = Object.entries(skillChart).map(([name, skills]) => ({
        name,
        skills: skills.map((s) => s.name),
    }));

    if (skills.length === 0) {
        return null;
    }

    return (
        <Stack gap={4} sx={{ breakAfter: "page" }}>
            <Typography variant="h3" sx={{ fontSize: "2.125rem" }}>
                Professional skills
            </Typography>
            <TableContainer>
                <Table
                    sx={{
                        "& .MuiTableCell-head": {
                            borderBottom: `1px solid ${theme.palette.primary.main}`,
                            "@media print": {
                                backgroundColor: "#fff",
                                color: "#000",
                            },
                        },
                        "& .MuiTableCell-body": {
                            verticalAlign: "top",
                            "@media print": {
                                borderBottom: `1px solid ${theme.palette.secondary.main}`,
                            },
                        },
                        "& .MuiListItem-gutters": {
                            "@media print": {
                                color: theme.palette.secondary.main,
                            },
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 260 }}>SKILLS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    <Box
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {row.name}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <List sx={{ padding: 0 }}>
                                        {row.skills.map((skillName) => (
                                            <ListItem key={`${row.name}-${skillName}`} sx={{ pt: 0 }}>
                                                {skillName}
                                            </ListItem>
                                        ))}
                                    </List>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
