import { Fragment, useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import type { SkillMasteryMock } from "../../model/types";

interface SkillsSectionProps {
    title?: string;
    skills: SkillMasteryMock[];
    isEditable?: boolean;
    onAddSkill?: () => void;
    onUpdateSkill?: (skill: SkillMasteryMock) => void;
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
    onAddSkill,
    onUpdateSkill,
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

    const handleCancel = () => {
        setSelectedIds([]);
        setIsDeleting(false);
    };

    return (
        <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{title}</Typography>
                {isEditable && (
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={onAddSkill}
                            color="primary"
                        >
                            Add skill
                        </Button>
                        {!isDeleting ? (
                            <Button
                                variant="text"
                                startIcon={<DeleteOutlineIcon />}
                                onClick={() => setIsDeleting(true)}
                                disabled={!skills.length}
                            >
                                Remove skills
                            </Button>
                        ) : (
                            <Fragment>
                                <Button variant="contained" color="error" onClick={handleDelete}>
                                    Confirm remove ({selectedIds.length})
                                </Button>
                                <Button startIcon={<CloseIcon />} onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Fragment>
                        )}
                    </Stack>
                )}
            </Stack>

            <Stack spacing={4}>
                {Object.entries(groupedSkills).map(([categoryName, categorySkills]) => (
                    <Card key={categoryName} elevation={0} sx={{ backgroundColor: "transparent" }}>
                        <CardHeader
                            titleTypographyProps={{ variant: "subtitle1" }}
                            title={categoryName}
                            sx={{ px: 0 }}
                        />
                        <CardContent sx={{ pt: 0, px: 0 }}>
                            <Stack
                                direction="row"
                                flexWrap="wrap"
                                divider={<Divider flexItem orientation="vertical" />}
                            >
                                {categorySkills.map((skill) => (
                                    <Box
                                        key={skill.id}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                            width: { xs: "100%", sm: "50%", lg: "33.33%" },
                                            minWidth: 220,
                                            p: 1,
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {isDeleting && (
                                                <Checkbox
                                                    checked={selectedIds.includes(skill.id)}
                                                    onChange={() => toggleSelection(skill.id)}
                                                    size="small"
                                                />
                                            )}
                                            <Typography variant="body1" fontWeight={500}>
                                                {skill.name}
                                            </Typography>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={skill.mastery}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: "rgba(255,255,255,0.08)",
                                                "& .MuiLinearProgress-bar": {
                                                    borderRadius: 3,
                                                },
                                            }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            Mastery: {skill.mastery}%
                                        </Typography>
                                        {isEditable && !isDeleting && (
                                            <Button
                                                size="small"
                                                variant="text"
                                                onClick={() => onUpdateSkill?.(skill)}
                                            >
                                                Update mastery
                                            </Button>
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
};


