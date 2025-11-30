import { useState, FormEvent, useEffect } from "react";
import { Stack, TextField, Alert } from "@mui/material";
import { FormButtons } from "@shared/ui/form/FormButtons";

interface CvFormData {
    name: string;
    education: string;
    description: string;
}

interface CvFormProps {
    initialData?: CvFormData;
    onSubmit: (data: CvFormData) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
}

export const CvForm = ({
    initialData,
    onSubmit,
    onCancel,
    loading = false,
    error,
}: CvFormProps) => {
    const [name, setName] = useState(initialData?.name || "");
    const [education, setEducation] = useState(initialData?.education || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEducation(initialData.education);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const validate = (): boolean => {
        const errors: Record<string, string> = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!education.trim()) {
            errors.education = "Education is required";
        }

        if (!description.trim()) {
            errors.description = "Description is required";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        await onSubmit({ name, education, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                    disabled={loading}
                />
                <TextField
                    label="Education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                    fullWidth
                    error={!!validationErrors.education}
                    helperText={validationErrors.education}
                    disabled={loading}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    error={!!validationErrors.description}
                    helperText={validationErrors.description}
                    disabled={loading}
                />
                <FormButtons
                    title="Save"
                    loading={loading}
                    disabled={loading}
                    onCancel={onCancel}
                />
            </Stack>
        </form>
    );
};

