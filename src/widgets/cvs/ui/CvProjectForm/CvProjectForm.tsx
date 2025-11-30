import { useState, FormEvent, useEffect } from "react";
import { Stack, TextField, Alert, Chip, Box } from "@mui/material";
import { useProjects } from "@entities/project";
import { FormButtons } from "@shared/ui";

interface CvProjectFormData {
    projectId: string;
    start_date: string;
    end_date: string | null;
    roles: string[];
    responsibilities: string[];
}

interface CvProjectFormProps {
    initialData?: CvProjectFormData;
    onSubmit: (data: CvProjectFormData) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
    excludeProjectIds?: string[];
}

export const CvProjectForm = ({
    initialData,
    onSubmit,
    onCancel,
    loading = false,
    error,
    excludeProjectIds = [],
}: CvProjectFormProps) => {
    const { data: projectsData } = useProjects();
    const [projectId, setProjectId] = useState(initialData?.projectId || "");
    const [startDate, setStartDate] = useState(
        initialData?.start_date || "",
    );
    const [endDate, setEndDate] = useState(
        initialData?.end_date || "",
    );
    const [roles, setRoles] = useState<string[]>(initialData?.roles || []);
    const [currentRole, setCurrentRole] = useState("");
    const [responsibilities, setResponsibilities] = useState<string[]>(
        initialData?.responsibilities || [],
    );
    const [currentResponsibility, setCurrentResponsibility] = useState("");
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setProjectId(initialData.projectId);
            setStartDate(initialData.start_date || "");
            setEndDate(initialData.end_date || "");
            setRoles(initialData.roles);
            setResponsibilities(initialData.responsibilities);
        }
    }, [initialData]);

    const availableProjects = projectsData?.projects.filter(
        (p) => !excludeProjectIds.includes(p.id),
    ) || [];

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

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddRole = () => {
        if (currentRole.trim() && !roles.includes(currentRole.trim())) {
            setRoles([...roles, currentRole.trim()]);
            setCurrentRole("");
        }
    };

    const handleRemoveRole = (role: string) => {
        setRoles(roles.filter((r) => r !== role));
    };

    const handleAddResponsibility = () => {
        if (currentResponsibility.trim() && !responsibilities.includes(currentResponsibility.trim())) {
            setResponsibilities([...responsibilities, currentResponsibility.trim()]);
            setCurrentResponsibility("");
        }
    };

    const handleRemoveResponsibility = (responsibility: string) => {
        setResponsibilities(responsibilities.filter((r) => r !== responsibility));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        await onSubmit({
            projectId,
            start_date: startDate,
            end_date: endDate || null,
            roles,
            responsibilities,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <TextField
                    select
                    label="Project"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    required
                    fullWidth
                    error={!!validationErrors.projectId}
                    helperText={validationErrors.projectId}
                    disabled={loading}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value="">Select a project</option>
                    {availableProjects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </TextField>
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
                    label="End Date (optional)"
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
                    <Box>
                        <TextField
                            label="Roles"
                            value={currentRole}
                            onChange={(e) => setCurrentRole(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddRole();
                                }
                            }}
                            fullWidth
                            disabled={loading}
                            InputProps={{
                                onBlur: handleAddRole,
                            }}
                        />
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                            {roles.map((role) => (
                                <Chip
                                    key={role}
                                    label={role}
                                    onDelete={() => handleRemoveRole(role)}
                                    disabled={loading}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <TextField
                            label="Responsibilities"
                            value={currentResponsibility}
                            onChange={(e) => setCurrentResponsibility(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddResponsibility();
                                }
                            }}
                            fullWidth
                            disabled={loading}
                            InputProps={{
                                onBlur: handleAddResponsibility,
                            }}
                        />
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                            {responsibilities.map((responsibility) => (
                                <Chip
                                    key={responsibility}
                                    label={responsibility}
                                    onDelete={() => handleRemoveResponsibility(responsibility)}
                                    disabled={loading}
                                />
                            ))}
                        </Box>
                    </Box>
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

