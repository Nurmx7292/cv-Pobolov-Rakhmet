import { FormDialog } from "@shared/ui/dialog/FormDialog";
import { AddCvProjectForm } from "../AddCvProjectForm/AddCvProjectForm";

interface AddCvProjectDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        projectId: string;
        start_date: string;
        end_date: string | null;
        roles: string[];
        responsibilities: string[];
    }) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
    excludeProjectIds?: string[];
}

export const AddCvProjectDialog = ({
    open,
    onClose,
    onSubmit,
    loading = false,
    error,
    excludeProjectIds = [],
}: AddCvProjectDialogProps) => {
    return (
        <FormDialog open={open} onClose={onClose} entityName="Project" variant="add" maxWidth="md">
            <AddCvProjectForm
                onSubmit={onSubmit}
                onCancel={onClose}
                loading={loading}
                error={error}
                excludeProjectIds={excludeProjectIds}
            />
        </FormDialog>
    );
};

