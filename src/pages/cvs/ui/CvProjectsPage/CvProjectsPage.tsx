import { useOutletContext, useParams } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import { Stack, Typography, Box, TextField } from "@mui/material";
import {
    CvProjectsTable,
    AddCvProjectDialog,
    UpdateCvProjectDialog,
    RemoveCvProjectDialog,
    type CvPageContextValue,
} from "@widgets/cvs";
import { CreateButton } from "@shared/ui/btn/CreateButton";
import {
    useAddCvProject,
    useUpdateCvProject,
    useRemoveCvProject,
} from "@entities/cv";
import { useNotification } from "@shared/lib/notifications";
import type { CvProject } from "@entities/cv";

export const CvProjectsPage = () => {
    const { cv, refetch } = useOutletContext<CvPageContextValue>();
    const { cvId } = useParams<{ cvId: string }>();
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<CvProject | null>(null);
    const [searchString, setSearchString] = useState("");
    const [addCvProject, { loading: adding, error: addError }] = useAddCvProject();
    const [updateCvProject, { loading: updating, error: updateError }] = useUpdateCvProject();
    const [removeCvProject, { loading: removing, error: removeError }] = useRemoveCvProject();
    const { showNotification, NotificationComponent } = useNotification();

    const currentUserId = localStorage.getItem("currentUserId");
    const isEditable = cv?.user?.id === currentUserId;

    const existingProjectIds = useMemo(() => {
        return cv?.projects.map((p) => p.project.id) || [];
    }, [cv?.projects]);

    const handleAdd = useCallback(
        async (data: {
            projectId: string;
            start_date: string;
            end_date: string | null;
            roles: string[];
            responsibilities: string[];
        }) => {
            if (!cvId) return;
            try {
                await addCvProject({
                    variables: {
                        project: {
                            cvId,
                            projectId: data.projectId,
                            start_date: data.start_date,
                            end_date: data.end_date,
                            roles: data.roles,
                            responsibilities: data.responsibilities,
                        },
                    },
                });
                await refetch();
                setAddDialogOpen(false);
                showNotification("Project was added", "success");
            } catch (err) {
                console.error("Failed to add project:", err);
                showNotification("Failed to add project", "error");
            }
        },
        [addCvProject, refetch, cvId, showNotification],
    );

    const handleUpdate = useCallback(
        async (data: {
            projectId: string;
            start_date: string;
            end_date: string | null;
            roles: string[];
            responsibilities: string[];
        }) => {
            if (!cvId || !selectedProject) return;
            try {
                await updateCvProject({
                    variables: {
                        project: {
                            cvId,
                            projectId: data.projectId,
                            start_date: data.start_date,
                            end_date: data.end_date,
                            roles: data.roles,
                            responsibilities: data.responsibilities,
                        },
                    },
                });
                await refetch();
                setUpdateDialogOpen(false);
                setSelectedProject(null);
                showNotification("Project was updated", "success");
            } catch (err) {
                console.error("Failed to update project:", err);
                showNotification("Failed to update project", "error");
            }
        },
        [updateCvProject, refetch, cvId, selectedProject, showNotification],
    );

    const handleRemove = useCallback(
        async () => {
            if (!cvId || !selectedProject) return;
            try {
                await removeCvProject({
                    variables: {
                        project: {
                            cvId,
                            projectId: selectedProject.project.id,
                        },
                    },
                });
                await refetch();
                setRemoveDialogOpen(false);
                setSelectedProject(null);
                showNotification("Project was removed", "success");
            } catch (err) {
                console.error("Failed to remove project:", err);
                showNotification("Failed to remove project", "error");
            }
        },
        [removeCvProject, refetch, cvId, selectedProject, showNotification],
    );

    const handleEdit = (project: CvProject) => {
        setSelectedProject(project);
        setUpdateDialogOpen(true);
    };

    const handleRemoveClick = (project: CvProject) => {
        setSelectedProject(project);
        setRemoveDialogOpen(true);
    };

    if (!cv) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6">CV not found</Typography>
            </Box>
        );
    }

    return (
        <>
            <Stack spacing={2} sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                <Stack
                    direction="row"
                    gap={2}
                    sx={{
                        paddingLeft: "1.25rem",
                        paddingTop: "0.5rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        placeholder="Search by name or domain"
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        sx={{ flex: 1, maxWidth: "400px" }}
                    />
                    {isEditable && (
                        <CreateButton
                            entityName="Project"
                            actionName="Add"
                            variant="primary"
                            renderDialog={({ open, onClose }) => (
                                <AddCvProjectDialog
                                    open={open}
                                    onClose={onClose}
                                    onSubmit={handleAdd}
                                    loading={adding}
                                    error={addError}
                                    excludeProjectIds={existingProjectIds}
                                />
                            )}
                        />
                    )}
                </Stack>
                <Box sx={{ flex: 1, minHeight: 0, overflow: "auto", px: "1.25rem", pb: "2rem" }}>
                    <CvProjectsTable
                        projects={cv.projects}
                        searchString={searchString}
                        onEdit={isEditable ? handleEdit : undefined}
                        onRemove={isEditable ? handleRemoveClick : undefined}
                    />
                </Box>
            </Stack>
            {selectedProject && (
                <>
                    <UpdateCvProjectDialog
                        open={updateDialogOpen}
                        onClose={() => {
                            setUpdateDialogOpen(false);
                            setSelectedProject(null);
                        }}
                        project={selectedProject}
                        onSubmit={handleUpdate}
                        loading={updating}
                        error={updateError}
                    />
                    <RemoveCvProjectDialog
                        open={removeDialogOpen}
                        onClose={() => {
                            setRemoveDialogOpen(false);
                            setSelectedProject(null);
                        }}
                        project={selectedProject}
                        onConfirm={handleRemove}
                        loading={removing}
                        error={removeError}
                    />
                </>
            )}
            <NotificationComponent />
        </>
    );
};

