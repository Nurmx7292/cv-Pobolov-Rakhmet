import { LanguageProficiency } from "@features/languages";

interface SelectProfileLanguageButtonProps {
    languageName: string;
    proficiency: string;
    isSelected: boolean;
    onToggle: () => void;
}

export const SelectProfileLanguageButton = ({
    languageName,
    proficiency,
    isSelected,
    onToggle,
}: SelectProfileLanguageButtonProps) => {
    return (
        <div
            onClick={onToggle}
            style={{ cursor: "pointer", width: "100%" }}
        >
            <LanguageProficiency
                languageName={languageName}
                proficiency={proficiency}
                isSelected={isSelected}
            />
        </div>
    );
};

