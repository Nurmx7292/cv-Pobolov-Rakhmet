import { CreateButton } from "@shared/ui/btn/CreateButton";
import { CreateCvDialog } from "../CreateCvDialog/CreateCvDialog";

interface CreateCvButtonProps {
    userId: string;
}

export const CreateCvButton = ({ userId }: CreateCvButtonProps) => {
    return (
        <CreateButton
            sx={{ marginRight:"50px" }}
            entityName="CV"
            actionName="CREATE"
            variant="primary"
            renderDialog={({ open, onClose }) => (
                <CreateCvDialog open={open} onClose={onClose} userId={userId} />
            )}
        />
    );
};

