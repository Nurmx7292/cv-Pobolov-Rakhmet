import { useState } from "react";
import Stack from "@mui/material/Stack";
import { LanguageSelect, LanguageProficiencySelect } from "@features/languages";

interface AddProfileLanguageFormProps {
    onSubmit: (name: string, proficiency: string) => void;
    onCancel: () => void;
    existingLanguageNames?: string[];
    disabled?: boolean;
}

export const AddProfileLanguageForm = ({
    onSubmit,
    onCancel,
    existingLanguageNames = [],
    disabled = false,
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

