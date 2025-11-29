import { TextField, MenuItem } from "@mui/material";

const masteryOptions = [
    { value: 20, label: "Novice", enum: "Novice" },
    { value: 40, label: "Intermediate", enum: "Advanced" },
    { value: 60, label: "Competent", enum: "Competent" },
    { value: 80, label: "Proficient", enum: "Proficient" },
    { value: 100, label: "Expert", enum: "Expert" },
];

export const masteryNumberToEnum = (value: number): string => {
    const option = masteryOptions.find((opt) => opt.value === value);
    return option?.enum || "Novice";
};

interface SkillMasterySelectProps {
    value: number;
    onChange: (value: number) => void;
    label?: string;
    disabled?: boolean;
}

export const SkillMasterySelect = ({
    value,
    onChange,
    label = "Skill mastery",
    disabled = false,
}: SkillMasterySelectProps) => {
    return (
        <TextField
            select
            label={label}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            required
            disabled={disabled}
        >
            {masteryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};


