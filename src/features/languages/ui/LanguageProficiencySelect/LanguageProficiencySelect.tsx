import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface LanguageProficiencySelectProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    disabled?: boolean;
}

const proficiencyOptions = [
    { value: "Native", label: "Native" },
    { value: "C2", label: "C2" },
    { value: "C1", label: "C1" },
    { value: "B2", label: "B2" },
    { value: "B1", label: "B1" },
    { value: "A2", label: "A2" },
    { value: "A1", label: "A1" },
];

export const LanguageProficiencySelect = ({
    value,
    onChange,
    label = "Proficiency",
    disabled = false,
}: LanguageProficiencySelectProps) => {
    return (
        <TextField
            select
            label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required
            disabled={disabled}
            fullWidth
        >
            {proficiencyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

