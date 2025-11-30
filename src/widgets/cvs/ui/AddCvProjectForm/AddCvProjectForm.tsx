import { CvProjectForm } from "../CvProjectForm/CvProjectForm";

interface AddCvProjectFormProps {
    onSubmit: (data: {
        projectId: string;
        start_date: string;
        end_date: string | null;
        roles: string[];
        responsibilities: string[];
    }) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
    excludeProjectIds?: string[];
}

export const AddCvProjectForm = ({
    onSubmit,
    onCancel,
    loading = false,
    error,
    excludeProjectIds = [],
}: AddCvProjectFormProps) => {
    return (
        <CvProjectForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            loading={loading}
            error={error}
            excludeProjectIds={excludeProjectIds}
        />
    );
};

