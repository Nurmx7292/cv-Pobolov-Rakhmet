import { Stack, Typography, Grid } from "@mui/material";
import { LanguageProficiency } from "@features/languages";
import type { CvLanguage } from "@entities/cv";

interface CvLanguagesProps {
    languages: CvLanguage[];
}

export const CvLanguages = ({ languages }: CvLanguagesProps) => {
    if (languages.length === 0) {
        return (
            <Stack spacing={2} className="cv-languages">
                <Typography variant="h6" component="h3" className="cv-languages-title">
                    Languages
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    No languages added yet.
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={2} className="cv-languages">
            <Typography variant="h6" component="h3" className="cv-languages-title">
                Languages
            </Typography>
            <Grid container columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
                {languages.map((language) => (
                    <Grid key={language.name} size={1} className="cv-language-item">
                        <LanguageProficiency
                            languageName={language.name}
                            proficiency={language.proficiency}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

