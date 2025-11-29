import { LinearProgress, Stack, Typography, linearProgressClasses } from "@mui/material";

interface SkillProgressProps {
    skillName: string;
    mastery: number;
    isSelected?: boolean;
}

const masteryPalette = [
    { threshold: 20, background: "#4a0e0f", progress: "#C63031" },
    { threshold: 40, background: "#4a3000", progress: "#E0A000" },
    { threshold: 60, background: "#1d3d4b", progress: "#2F9BC1" },
    { threshold: 80, background: "#1f4219", progress: "#52B45A" },
    { threshold: 100, background: "#4a1e3c", progress: "#D44F8B" },
];

const resolveColors = (mastery: number) => {
    return masteryPalette.find((item) => mastery <= item.threshold) ?? masteryPalette.at(-1)!;
};

export const SkillProgress = ({ skillName, mastery, isSelected = false }: SkillProgressProps) => {
    const { background, progress } = resolveColors(mastery);

    return (
        <Stack direction="row" sx={{ gap: "1rem", alignItems: "center" }}>
            <LinearProgress
                variant="determinate"
                value={mastery}
                sx={{
                    width: "5rem",
                    height: 6,
                    borderRadius: 3,
                    [`&.${linearProgressClasses.colorPrimary}`]: {
                        backgroundColor: background,
                    },
                    [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: progress,
                        borderRadius: 3,
                    },
                }}
            />
            <Typography 
                variant="body2" 
                fontWeight={isSelected ? 700 : 500}
                sx={(theme) => ({
                    color: isSelected 
                        ? (theme.palette.mode === "dark" ? "#fff" : "#000")
                        : "#767676",
                })}
            >
                {skillName}
            </Typography>
        </Stack>
    );
};


