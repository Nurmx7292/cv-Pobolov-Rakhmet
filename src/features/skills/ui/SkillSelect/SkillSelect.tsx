import { useMemo } from "react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";
import { useSkillOptions } from "@entities/skill";

interface SkillSelectProps {
    value: string;
    onChange: (value: string) => void;
    excludeIds?: string[];
    label?: string;
    disabled?: boolean;
}

export const SkillSelect = ({
    value,
    onChange,
    excludeIds = [],
    label = "Skill",
    disabled = false,
}: SkillSelectProps) => {
    const { skills, loading } = useSkillOptions();

    const options = useMemo(
        () => skills.filter((skill) => !excludeIds.includes(skill.id)),
        [excludeIds, skills],
    );

    return (
        <TextField
            select
            label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required
            disabled={disabled || loading}
            InputProps={{
                endAdornment: loading ? <CircularProgress size={18} /> : null,
            }}
        >
            {options.map((skill) => (
                <MenuItem key={skill.id} value={skill.id}>
                    {skill.name}
                </MenuItem>
            ))}
        </TextField>
    );
};


