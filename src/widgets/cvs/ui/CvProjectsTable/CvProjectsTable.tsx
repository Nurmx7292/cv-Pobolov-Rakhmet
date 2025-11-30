import { useState, useMemo, MouseEvent } from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { CvProject } from "@entities/cv";

type SortKey = "name" | "domain" | "start_date" | null;
type SortDirection = "asc" | "desc";

interface CvProjectsTableProps {
    projects: CvProject[];
    loading?: boolean;
    error?: Error | null;
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
    onEdit,
    onRemove,
}: CvProjectsTableProps) => {
    const [searchString, setSearchString] = useState("");
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

        if (searchString) {
            const searchLower = searchString.toLowerCase();
            filtered = filtered.filter(
                (project) =>
                    project.name.toLowerCase().includes(searchLower) ||
                    (project.domain && project.domain.toLowerCase().includes(searchLower)),
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
    }, [projects, searchString, sortConfig]);

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
            <TextField
                fullWidth
                placeholder="Search by name or domain"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                sx={{ mb: 2 }}
            />
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
                                <TableRow key={project.id} hover>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.domain || "-"}</TableCell>
                                    <TableCell>{formatDate(project.start_date)}</TableCell>
                                    <TableCell>
                                        {project.end_date ? formatDate(project.end_date) : "Present"}
                                    </TableCell>
                                    <TableCell align="right">
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

