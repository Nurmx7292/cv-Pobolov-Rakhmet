import { useMemo } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useLanguages, type Language } from "@entities/language";

interface LanguageSelectProps {
    value: string;
    onChange: (value: string) => void;
    excludeNames?: string[];
    label?: string;
    disabled?: boolean;
}

export const LanguageSelect = ({
    value,
    onChange,
    excludeNames = [],
    label = "Language",
    disabled = false,
}: LanguageSelectProps) => {
    const { data, loading } = useLanguages();

    const options = useMemo(() => {
        if (!data?.languages) return [];
        return data.languages.filter(
            (language) => !excludeNames.includes(language.name),
        );
    }, [data?.languages, excludeNames]);

    const sortedOptions = useMemo(() => {
        return [...options].sort((a, b) => a.name.localeCompare(b.name));
    }, [options]);

    return (
        <TextField
            select
            label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required
            disabled={disabled || loading}
            fullWidth
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
            {sortedOptions.map((language: Language) => (
                <MenuItem key={language.id} value={language.name}>
                    {language.native_name || language.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

