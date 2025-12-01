import { useState } from "react";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { LanguageSelect, LanguageProficiencySelect } from "@features/languages";

interface AddProfileLanguageFormProps {
    onSubmit: (name: string, proficiency: string) => void;
    onCancel: () => void;
    existingLanguageNames?: string[];
    disabled?: boolean;
    error?: Error | null;
}

export const AddProfileLanguageForm = ({
    onSubmit,
    onCancel,
    existingLanguageNames = [],
    disabled = false,
    error,
}: AddProfileLanguageFormProps) => {
    const [languageName, setLanguageName] = useState("");
    const [proficiency, setProficiency] = useState("A1");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (languageName && proficiency) {
            onSubmit(languageName, proficiency);
        }
    };

    return (
        <form onSubmit={handleSubmit} id="add-language-form">
            <Stack spacing={2}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <LanguageSelect
                    value={languageName}
                    onChange={setLanguageName}
                    excludeNames={existingLanguageNames}
                    disabled={disabled}
                />
                <LanguageProficiencySelect
                    value={proficiency}
                    onChange={setProficiency}
                    disabled={disabled}
                />
            </Stack>
        </form>
    );
};

