import { useState, type ReactNode } from "react";
import {
    Grid,
    Stack,
} from "@mui/material";
import { LanguageProficiency } from "@features/languages";
import { SelectorButton } from "@shared/ui";
import { DeleteSelectorButton } from "@shared/ui";
import type { LanguageProficiency as LanguageProficiencyType } from "@entities/profile";

interface LanguagesSectionProps {
    languages: LanguageProficiencyType[];
    isEditable?: boolean;
    renderAddButton?: () => ReactNode;
    renderUpdateButton?: (language: LanguageProficiencyType) => ReactNode;
    onDeleteLanguages?: (names: string[]) => void;
}

export const LanguagesSection = ({
    languages,
    isEditable = false,
    renderAddButton,
    renderUpdateButton,
    onDeleteLanguages,
}: LanguagesSectionProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const toggleSelection = (languageName: string) => {
        setSelectedNames((prev) =>
            prev.includes(languageName) ? prev.filter((name) => name !== languageName) : [...prev, languageName],
        );
    };

    const handleDelete = () => {
        if (!selectedNames.length) {
            setIsDeleting(false);
            return;
        }

        onDeleteLanguages?.(selectedNames);
        setSelectedNames([]);
        setIsDeleting(false);
    };

    return (
        <Stack sx={{ alignItems: "center", px: "1.25rem" }}>
            <Stack maxWidth="900px" spacing={6} width="100%">
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Grid container columns={{ xs: 1, sm: 2, lg: 3 }}>
                            {languages.map((language) => (
                                <Grid
                                    key={language.name}
                                    size={1}
                                    sx={{ minWidth: "17rem", padding: "0.75rem 1rem" }}
                                >
                                    {isDeleting ? (
                                        <SelectorButton
                                            isSelected={selectedNames.includes(language.name)}
                                            onClick={() => toggleSelection(language.name)}
                                        >
                                            <LanguageProficiency
                                                languageName={language.name}
                                                proficiency={language.proficiency}
                                                isSelected={selectedNames.includes(language.name)}
                                            />
                                        </SelectorButton>
                                    ) : isEditable && renderUpdateButton ? (
                                        renderUpdateButton(language)
                                    ) : (
                                        <LanguageProficiency
                                            languageName={language.name}
                                            proficiency={language.proficiency}
                                        />
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Stack>
                {isEditable && (
                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        {!isDeleting && renderAddButton && renderAddButton()}
                        <DeleteSelectorButton
                            data={selectedNames}
                            entityName="language"
                            isDeleting={isDeleting}
                            loading={false}
                            onSubmit={handleDelete}
                            onChange={setIsDeleting}
                        />
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

