import { TextField, MenuItem } from "@mui/material";

const masteryOptions = [
    { value: 20, label: "Novice" },
    { value: 40, label: "Intermediate" },
    { value: 60, label: "Competent" },
    { value: 80, label: "Proficient" },
    { value: 100, label: "Expert" },
];

interface SkillMasterySelectProps {
    value: number;
    onChange: (value: number) => void;
    label?: string;
}

export const SkillMasterySelect = ({
    value,
    onChange,
    label = "Skill mastery",
}: SkillMasterySelectProps) => {
    return (
        <TextField
            select
            label={label}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            required
        >
            {masteryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};


