import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { LanguageProficiencySelect } from "@features/languages";

interface ProfileLanguageFormProps {
    initialProficiency: string;
    onSubmit: (proficiency: string) => void;
    onCancel: () => void;
    disabled?: boolean;
}

export const ProfileLanguageForm = ({
    initialProficiency,
    onSubmit,
    onCancel,
    disabled = false,
}: ProfileLanguageFormProps) => {
    const [proficiency, setProficiency] = useState(initialProficiency);

    useEffect(() => {
        setProficiency(initialProficiency);
    }, [initialProficiency]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (proficiency) {
            onSubmit(proficiency);
        }
    };

    return (
        <form onSubmit={handleSubmit} id="update-language-form">
            <Stack spacing={2}>
                <LanguageProficiencySelect
                    value={proficiency}
                    onChange={setProficiency}
                    disabled={disabled}
                />
            </Stack>
        </form>
    );
};

