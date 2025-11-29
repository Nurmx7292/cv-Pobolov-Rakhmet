import { useMemo } from "react";
import { TextField, MenuItem, CircularProgress, ListSubheader } from "@mui/material";
import { useSkillOptions } from "@entities/skill";
import type { SkillOption } from "@entities/skill";

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

    const groupedOptions = useMemo(() => {
        const grouped: Record<string, SkillOption[]> = {};
        options.forEach((skill) => {
            const categoryName = skill.category?.name || "Other";
            if (!grouped[categoryName]) {
                grouped[categoryName] = [];
            }
            grouped[categoryName].push(skill);
        });
        return grouped;
    }, [options]);

    const categories = useMemo(() => Object.keys(groupedOptions).sort(), [groupedOptions]);

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
            SelectProps={{
                MenuProps: {
                    PaperProps: {
                        sx: {
                            maxHeight: 300,
                        },
                    },
                },
            }}
        >
            {categories.map((categoryName) => [
                <ListSubheader key={`header-${categoryName}`} sx={{ color: "primary.main" }}>
                    {categoryName}
                </ListSubheader>,
                ...groupedOptions[categoryName].map((skill) => (
                    <MenuItem 
                        key={skill.id} 
                        value={`${skill.name}:${skill.category?.id || -1}`} 
                        sx={{ pl: 3 }}
                    >
                        {skill.name}
                    </MenuItem>
                )),
            ])}
        </TextField>
    );
};


