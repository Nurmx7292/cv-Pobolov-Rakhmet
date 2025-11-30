import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface LanguageProficiencyProps {
    languageName: string;
    proficiency: string;
    isSelected?: boolean;
}

const getProficiencyColor = (proficiency: string): string => {
    const colorMap: Record<string, string> = {
        Native: "#4CAF50",
        C2: "#8BC34A",
        C1: "#CDDC39",
        B2: "#FFEB3B",
        B1: "#FFC107",
        A2: "#FF9800",
        A1: "#FF5722",
    };
    return colorMap[proficiency] || "#9E9E9E";
};

export const LanguageProficiency = ({
    languageName,
    proficiency,
    isSelected = false,
}: LanguageProficiencyProps) => {
    const theme = useTheme();
    const proficiencyColor = getProficiencyColor(proficiency);

    return (
        <Stack
            direction="row"
            sx={{
                gap: "1rem",
                alignItems: "center",
                padding: "0.5rem",
                borderRadius: "4px",
                backgroundColor: isSelected
                    ? theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)"
                    : "transparent",
            }}
        >
            <Box
                sx={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    backgroundColor: proficiencyColor,
                    flexShrink: 0,
                }}
            />
            <Typography
                variant="body2"
                fontWeight={isSelected ? 700 : 500}
                sx={{
                    color: isSelected
                        ? theme.palette.mode === "dark"
                            ? "#fff"
                            : "#000"
                        : "#767676",
                }}
            >
                {languageName}
            </Typography>
            <Typography
                variant="body2"
                fontWeight={isSelected ? 700 : 500}
                sx={{
                    color: proficiencyColor,
                    marginLeft: "auto",
                }}
            >
                {proficiency}
            </Typography>
        </Stack>
    );
};

