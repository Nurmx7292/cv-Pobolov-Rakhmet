import { FormDialog } from "@shared/ui/dialog/FormDialog";
import { CvProjectForm } from "../CvProjectForm/CvProjectForm";
import type { CvProject } from "@entities/cv";

interface UpdateCvProjectDialogProps {
    open: boolean;
    onClose: () => void;
    project: CvProject;
    onSubmit: (data: {
        projectId: string;
        start_date: string;
        end_date: string | null;
        roles: string[];
        responsibilities: string[];
    }) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const UpdateCvProjectDialog = ({
    open,
    onClose,
    project,
    onSubmit,
    loading = false,
    error,
}: UpdateCvProjectDialogProps) => {
    return (
        <FormDialog open={open} onClose={onClose} entityName="Project" variant="update" maxWidth="md">
            <CvProjectForm
                initialData={{
                    projectId: project.project.id,
                    start_date: project.start_date,
                    end_date: project.end_date,
                    roles: project.roles,
                    responsibilities: project.responsibilities,
                }}
                onSubmit={onSubmit}
                onCancel={onClose}
                loading={loading}
                error={error}
            />
        </FormDialog>
    );
};

