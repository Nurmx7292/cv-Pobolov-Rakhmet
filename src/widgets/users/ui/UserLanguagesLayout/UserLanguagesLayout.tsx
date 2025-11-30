import { useState, useMemo, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AddProfileLanguageButton } from "../AddProfileLanguageButton/AddProfileLanguageButton";
import { UpdateProfileLanguageButton } from "../UpdateProfileLanguageButton/UpdateProfileLanguageButton";
import { DeleteProfileLanguageButton } from "../DeleteProfileLanguageButton/DeleteProfileLanguageButton";
import { SelectProfileLanguageButton } from "../SelectProfileLanguageButton/SelectProfileLanguageButton";
import { LanguageProficiency } from "@features/languages";
import type { LanguageProficiency as LanguageProficiencyType } from "@entities/profile";

interface UserLanguagesLayoutProps {
    languages: LanguageProficiencyType[];
    isEditable: boolean;
    userId: string;
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
    userId,
    onAddLanguage,
    onUpdateLanguage,
    onDeleteLanguages,
    adding = false,
    updating = false,
    deleting = false,
    addError,
    updateError,
    deleteError,
}: UserLanguagesLayoutProps) => {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedLanguageNames, setSelectedLanguageNames] = useState<string[]>([]);

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

    const handleDeleteClick = useCallback(() => {
        if (isSelecting) {
            if (selectedLanguageNames.length > 0) {
                onDeleteLanguages(selectedLanguageNames);
                setSelectedLanguageNames([]);
            }
            setIsSelecting(false);
        } else {
            setIsSelecting(true);
        }
    }, [isSelecting, selectedLanguageNames, onDeleteLanguages]);

    const handleCancelDelete = useCallback(() => {
        setIsSelecting(false);
        setSelectedLanguageNames([]);
    }, []);

    const handleToggleLanguage = useCallback(
        (languageName: string) => {
            setSelectedLanguageNames((prev) => {
                if (prev.includes(languageName)) {
                    return prev.filter((name) => name !== languageName);
                } else {
                    return [...prev, languageName];
                }
            });
        },
        [],
    );

    const renderLanguage = useCallback(
        (language: LanguageProficiencyType) => {
            if (isSelecting && isEditable) {
                return (
                    <SelectProfileLanguageButton
                        key={language.name}
                        languageName={language.name}
                        proficiency={language.proficiency}
                        isSelected={selectedLanguageNames.includes(language.name)}
                        onToggle={() => handleToggleLanguage(language.name)}
                    />
                );
            } else if (isEditable) {
                return (
                    <UpdateProfileLanguageButton
                        key={language.name}
                        languageName={language.name}
                        proficiency={language.proficiency}
                        onSubmit={(proficiency) =>
                            handleUpdateLanguage(language.name, proficiency)
                        }
                        loading={updating}
                    />
                );
            } else {
                return (
                    <LanguageProficiency
                        key={language.name}
                        languageName={language.name}
                        proficiency={language.proficiency}
                    />
                );
            }
        },
        [
            isSelecting,
            isEditable,
            selectedLanguageNames,
            handleToggleLanguage,
            handleUpdateLanguage,
            updating,
        ],
    );

    return (
        <Stack
            sx={{
                alignItems: "center",
                px: "1.25rem",
                py: "2rem",
            }}
        >
            <Stack
                maxWidth="900px"
                spacing={4}
                width="100%"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5" component="h1">
                        Languages
                    </Typography>
                    {isEditable && (
                        <Stack direction="row" spacing={2}>
                            {isSelecting && (
                                <Box
                                    component="button"
                                    onClick={handleCancelDelete}
                                    sx={{
                                        border: "none",
                                        background: "none",
                                        cursor: "pointer",
                                        color: "text.secondary",
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        "&:hover": {
                                            color: "text.primary",
                                        },
                                    }}
                                >
                                    Cancel
                                </Box>
                            )}
                            <DeleteProfileLanguageButton
                                selectedLanguageNames={selectedLanguageNames}
                                onDelete={handleDeleteClick}
                                loading={deleting}
                                isSelecting={isSelecting}
                            />
                            {!isSelecting && (
                                <AddProfileLanguageButton
                                    onSubmit={handleAddLanguage}
                                    existingLanguageNames={existingLanguageNames}
                                    loading={adding}
                                />
                            )}
                        </Stack>
                    )}
                </Stack>

                {languages.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        No languages added yet.
                    </Typography>
                ) : (
                    <Grid
                        container
                        spacing={2}
                        columns={{ xs: 1, sm: 2, lg: 3 }}
                    >
                        {languages.map((language) => (
                            <Grid key={language.name} size={1}>
                                <Box
                                    sx={{
                                        minWidth: "17rem",
                                        padding: "0.75rem 1rem",
                                    }}
                                >
                                    {renderLanguage(language)}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {addError && (
                    <Typography variant="body2" color="error">
                        Failed to add language: {addError.message}
                    </Typography>
                )}
                {updateError && (
                    <Typography variant="body2" color="error">
                        Failed to update language: {updateError.message}
                    </Typography>
                )}
                {deleteError && (
                    <Typography variant="body2" color="error">
                        Failed to delete language: {deleteError.message}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
};

