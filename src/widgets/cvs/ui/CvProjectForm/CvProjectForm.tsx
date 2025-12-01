import { useState, FormEvent, useEffect, useMemo } from "react";
import { Stack, TextField, Alert, Chip, Box, MenuItem } from "@mui/material";
import { useProjects, type Project } from "@entities/project";
import { FormButtons } from "@shared/ui";
import type { CvProject } from "@entities/cv";

interface CvProjectFormData {
    projectId: string;
    start_date: string;
    end_date: string | null;
    roles: string[];
    responsibilities: string[];
}

interface CvProjectFormProps {
    initialData?: Partial<CvProjectFormData>;
    onSubmit: (data: CvProjectFormData) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
    excludeProjectIds?: string[];
    variant?: "add" | "update";
}

export const CvProjectForm = ({
    initialData,
    onSubmit,
    onCancel,
    loading = false,
    error,
    excludeProjectIds = [],
    variant = "add",
}: CvProjectFormProps) => {
    const { data: projectsData } = useProjects();
    const [projectId, setProjectId] = useState(initialData?.projectId || "");
    const [startDate, setStartDate] = useState(initialData?.start_date || "");
    const [endDate, setEndDate] = useState(initialData?.end_date || "");
    const [responsibilities, setResponsibilities] = useState(
        initialData?.responsibilities ? initialData.responsibilities.join("\n") : "",
    );
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const selectedProject = useMemo(() => {
        if (!projectId || !projectsData?.projects) return null;
        return projectsData.projects.find((p) => p.id === projectId) || null;
    }, [projectId, projectsData?.projects]);

    const availableProjects = useMemo(() => {
        if (!projectsData?.projects) return [];
        return projectsData.projects.filter(
            (p) => !excludeProjectIds.includes(p.id) || p.id === initialData?.projectId,
        );
    }, [projectsData?.projects, excludeProjectIds, initialData?.projectId]);

    useEffect(() => {
        if (initialData) {
            setProjectId(initialData.projectId || "");
            setStartDate(initialData.start_date || "");
            setEndDate(initialData.end_date || "");
            setResponsibilities(
                initialData.responsibilities ? initialData.responsibilities.join("\n") : "",
            );
        }
    }, [initialData]);

    const validate = (): boolean => {
        const errors: Record<string, string> = {};

        if (!projectId) {
            errors.projectId = "Project is required";
        }

        if (!startDate) {
            errors.startDate = "Start date is required";
        }

        if (endDate && startDate && endDate < startDate) {
            errors.endDate = "End date must be after start date";
        }

        if (!responsibilities.trim()) {
            errors.responsibilities = "Responsibilities are required";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        const responsibilitiesArray = responsibilities
            .split("\n")
            .map((r) => r.trim())
            .filter(Boolean);

        await onSubmit({
            projectId,
            start_date: startDate,
            end_date: endDate || null,
            roles: [],
            responsibilities: responsibilitiesArray,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ paddingTop: "0.5rem" }}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <Stack direction="row" spacing={3}>
                    <TextField
                        select
                        label="Project"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                        fullWidth
                        error={!!validationErrors.projectId}
                        helperText={validationErrors.projectId}
                        disabled={loading || variant === "update"}
                    >
                        {availableProjects.map((project) => (
                            <MenuItem key={project.id} value={project.id}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Domain"
                        value={selectedProject?.domain || ""}
                        fullWidth
                        disabled
                    />
                </Stack>
                <Stack direction="row" spacing={3}>
                    <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        fullWidth
                        error={!!validationErrors.startDate}
                        helperText={validationErrors.startDate}
                        disabled={loading}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        error={!!validationErrors.endDate}
                        helperText={validationErrors.endDate}
                        disabled={loading}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
                <TextField
                    label="Description"
                    value={selectedProject?.description || ""}
                    fullWidth
                    multiline
                    rows={7}
                    disabled
                />
                {selectedProject?.environment && selectedProject.environment.length > 0 && (
                    <Box>
                        <TextField
                            label="Environment"
                            value=""
                            fullWidth
                            disabled
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                            {selectedProject.environment.map((env) => (
                                <Chip key={env} label={env} variant="outlined" />
                            ))}
                        </Box>
                    </Box>
                )}
                <TextField
                    label="Responsibilities"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    required
                    fullWidth
                    multiline
                    rows={1}
                    error={!!validationErrors.responsibilities}
                    helperText={validationErrors.responsibilities}
                    disabled={loading}
                />
                <FormButtons
                    title={variant === "add" ? "ADD" : "UPDATE"}
                    loading={loading}
                    disabled={loading}
                    onCancel={onCancel}
                />
            </Stack>
        </form>
    );
};
