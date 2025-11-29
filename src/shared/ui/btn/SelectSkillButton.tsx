import { SelectorButton } from "./SelectorButton";

interface SelectSkillButtonProps {
    label: string;
    onClick: () => void;
    isSelected?: boolean;
}

export const SelectSkillButton = ({
    label,
    onClick,
    isSelected = false,
}: SelectSkillButtonProps) => {
    return (
        <SelectorButton isSelected={isSelected} onClick={onClick}>
            {label}
        </SelectorButton>
    );
};


