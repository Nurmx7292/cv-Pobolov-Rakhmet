import { useState, useMemo, MouseEvent, Fragment } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Box,
    CircularProgress,
    Stack,
    Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { CvProject } from "@entities/cv";

type SortKey = "name" | "domain" | "start_date" | null;
type SortDirection = "asc" | "desc";

interface CvProjectsTableProps {
    projects: CvProject[];
    loading?: boolean;
    error?: Error | null;
    searchString?: string;
    onEdit?: (project: CvProject) => void;
    onRemove?: (project: CvProject) => void;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const CvProjectsTable = ({
    projects,
    loading = false,
    error,
    searchString: externalSearchString = "",
    onEdit,
    onRemove,
}: CvProjectsTableProps) => {
    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: null,
        direction: "asc",
    });
    const [selectedProject, setSelectedProject] = useState<CvProject | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, project: CvProject) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedProject(project);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProject(null);
    };

    const handleEdit = () => {
        if (selectedProject && onEdit) {
            onEdit(selectedProject);
        }
        handleMenuClose();
    };

    const handleRemove = () => {
        if (selectedProject && onRemove) {
            onRemove(selectedProject);
        }
        handleMenuClose();
    };

    const handleSort = (key: SortKey) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const getSortIcon = (key: SortKey) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? " ▲" : " ▼";
    };

    const filteredAndSortedProjects = useMemo(() => {
        let filtered = [...projects];

        if (externalSearchString) {
            const searchLower = externalSearchString.toLowerCase();
            filtered = filtered.filter(
                (project) =>
                    project.name.toLowerCase().includes(searchLower) ||
                    (project.domain && project.domain.toLowerCase().includes(searchLower)) ||
                    (project.description && project.description.toLowerCase().includes(searchLower)),
            );
        }

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aValue: string | null = null;
                let bValue: string | null = null;

                if (sortConfig.key === "name") {
                    aValue = a.name;
                    bValue = b.name;
                } else if (sortConfig.key === "domain") {
                    aValue = a.domain || "";
                    bValue = b.domain || "";
                } else if (sortConfig.key === "start_date") {
                    aValue = a.start_date;
                    bValue = b.start_date;
                }

                if (aValue === null && bValue === null) return 0;
                if (aValue === null) return 1;
                if (bValue === null) return -1;

                const comparison = aValue.localeCompare(bValue);
                return sortConfig.direction === "asc" ? comparison : -comparison;
            });
        }

        return filtered;
    }, [projects, externalSearchString, sortConfig]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6" color="error">
                    Failed to load projects: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={() => handleSort("name")}
                                sx={{
                                    cursor: "pointer",
                                    userSelect: "none",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                Name{getSortIcon("name")}
                            </TableCell>
                            <TableCell>Domain</TableCell>
                            <TableCell
                                onClick={() => handleSort("start_date")}
                                sx={{
                                    cursor: "pointer",
                                    userSelect: "none",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                Start Date{getSortIcon("start_date")}
                            </TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAndSortedProjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No projects found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedProjects.map((project) => (
                                <Fragment key={project.id}>
                                    <TableRow hover>
                                        <TableCell sx={{ borderBottom: "none" }}>{project.name}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{project.domain || "-"}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{formatDate(project.start_date)}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>
                                            {project.end_date ? formatDate(project.end_date) : "Present"}
                                        </TableCell>
                                        <TableCell align="right" sx={{ borderBottom: "none" }}>
                                            {(onEdit || onRemove) && (
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleMenuOpen(e, project)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    {(project.description || (project.responsibilities && project.responsibilities.length > 0)) && (
                                        <TableRow>
                                            <TableCell colSpan={5} sx={{ paddingTop: 0, paddingBottom: 2 }}>
                                                <Stack spacing={2}>
                                                    {project.description && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            {project.description}
                                                        </Typography>
                                                    )}
                                                    {project.responsibilities && project.responsibilities.length > 0 && (
                                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                            {project.responsibilities.map((resp, index) => (
                                                                <Chip
                                                                    key={index}
                                                                    label={resp}
                                                                    variant="filled"
                                                                    size="small"
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {onEdit && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
                {onRemove && <MenuItem onClick={handleRemove}>Remove</MenuItem>}
            </Menu>
        </Box>
    );
};

