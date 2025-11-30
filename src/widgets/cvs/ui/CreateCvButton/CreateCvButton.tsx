import { CreateButton } from "@shared/ui/btn/CreateButton";
import { CreateCvDialog } from "../CreateCvDialog/CreateCvDialog";

interface CreateCvButtonProps {
    userId: string;
}

export const CreateCvButton = ({ userId }: CreateCvButtonProps) => {
    return (
        <CreateButton
            entityName="CV"
            actionName="Create"
            variant="primary"
            renderDialog={({ open, onClose }) => (
                <CreateCvDialog open={open} onClose={onClose} userId={userId} />
            )}
        />
    );
};

