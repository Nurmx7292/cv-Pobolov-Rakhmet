import { useMemo, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AddProfileLanguageButton } from "../AddProfileLanguageButton/AddProfileLanguageButton";
import { UpdateProfileLanguageButton } from "../UpdateProfileLanguageButton/UpdateProfileLanguageButton";
import { LanguagesSection } from "@widgets/languages";
import { LanguageProficiency } from "@features/languages";
import type { LanguageProficiency as LanguageProficiencyType } from "@entities/profile";

interface UserLanguagesLayoutProps {
    languages: LanguageProficiencyType[];
    isEditable: boolean;
    onAddLanguage: (name: string, proficiency: string) => Promise<void>;
    onUpdateLanguage: (name: string, proficiency: string) => Promise<void>;
    onDeleteLanguages: (names: string[]) => Promise<void>;
    adding?: boolean;
    updating?: boolean;
    deleting?: boolean;
    addError?: Error | null;
    updateError?: Error | null;
    deleteError?: Error | null;
}

export const UserLanguagesLayout = ({
    languages,
    isEditable,
    onAddLanguage,
    onUpdateLanguage,
    onDeleteLanguages,
    adding = false,
    updating = false,
    addError,
    updateError,
}: UserLanguagesLayoutProps) => {
    const existingLanguageNames = useMemo(
        () => languages.map((lang) => lang.name),
        [languages],
    );

    const handleAddLanguage = useCallback(
        async (name: string, proficiency: string) => {
            await onAddLanguage(name, proficiency);
        },
        [onAddLanguage],
    );

    const handleUpdateLanguage = useCallback(
        async (name: string, proficiency: string) => {
            await onUpdateLanguage(name, proficiency);
        },
        [onUpdateLanguage],
    );

    return (
        <Stack spacing={3} padding={{ xs: 2, md: 4 }}>
            <Typography variant="h6" component="h1">
                Languages
            </Typography>
            <LanguagesSection
                languages={languages}
                isEditable={isEditable}
                renderAddButton={() => (
                    <AddProfileLanguageButton
                        existingLanguageNames={existingLanguageNames}
                        onSubmit={handleAddLanguage}
                        loading={adding}
                        error={addError}
                        variant="secondary"
                    />
                )}
                renderUpdateButton={(language) => (
                    <UpdateProfileLanguageButton
                        languageName={language.name}
                        proficiency={language.proficiency}
                        onSubmit={(proficiency) =>
                            handleUpdateLanguage(language.name, proficiency)
                        }
                        loading={updating}
                        error={updateError}
                    >
                        <LanguageProficiency
                            languageName={language.name}
                            proficiency={language.proficiency}
                        />
                    </UpdateProfileLanguageButton>
                )}
                onDeleteLanguages={onDeleteLanguages}
            />
        </Stack>
    );
};

