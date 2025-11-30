import { DeleteSelectorButton } from "@shared/ui/btn/DeleteSelectorButton";

interface DeleteCvSkillButtonProps {
    selectedSkillNames: string[];
    onDelete: () => void;
    loading?: boolean;
    isSelecting?: boolean;
}

export const DeleteCvSkillButton = ({
    selectedSkillNames,
    onDelete,
    loading = false,
    isSelecting = false,
}: DeleteCvSkillButtonProps) => {
    return (
        <DeleteSelectorButton
            data={selectedSkillNames}
            entityName="skill"
            isDeleting={isSelecting}
            loading={loading}
            onSubmit={onDelete}
            onChange={() => {}}
        />
    );
};

