import { useState, useMemo, MouseEvent, Fragment } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    CircularProgress,
    Stack,
    Chip,
    TableSortLabel,
    useMediaQuery,
    useTheme,
    Button,
    Menu,
    MenuItem,
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

const rowHeight = 72;

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
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up("md"));
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
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
            <TableContainer sx={{ overflowY: "auto", flex: 1 }}>
                <Table size="medium" stickyHeader sx={{ opacity: loading ? 0.5 : 1 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{
                                    flex: 1,
                                    cursor: "pointer",
                                    userSelect: "none",
                                }}
                                onClick={() => handleSort("name")}
                            >
                                <TableSortLabel
                                    active={sortConfig.key === "name"}
                                    direction={sortConfig.key === "name" ? sortConfig.direction : "asc"}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            {isMd && (
                                <TableCell
                                    style={{
                                        flex: 1,
                                        cursor: "pointer",
                                        userSelect: "none",
                                    }}
                                    onClick={() => handleSort("domain")}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === "domain"}
                                        direction={sortConfig.key === "domain" ? sortConfig.direction : "asc"}
                                    >
                                        Domain
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {isMd && (
                                <TableCell
                                    style={{
                                        flex: 1,
                                        cursor: "pointer",
                                        userSelect: "none",
                                    }}
                                    onClick={() => handleSort("start_date")}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === "start_date"}
                                        direction={sortConfig.key === "start_date" ? sortConfig.direction : "asc"}
                                    >
                                        Start Date
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {isMd && <TableCell style={{ flex: 1 }}>End Date</TableCell>}
                            {(onEdit || onRemove) && <TableCell style={{ width: 100 }} align="right">Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAndSortedProjects.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        isMd
                                            ? onEdit || onRemove
                                                ? 5
                                                : 4
                                            : onEdit || onRemove
                                                ? 2
                                                : 1
                                    }
                                    align="center"
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        No projects found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedProjects.map((project) => (
                                <Fragment key={project.id}>
                                    <TableRow sx={{ height: rowHeight }} hover>
                                        <TableCell
                                            sx={(theme) => ({
                                                color: theme.palette.text.secondary,
                                                borderBottom: "none",
                                            })}
                                        >
                                            {project.name}
                                        </TableCell>
                                        {isMd && (
                                            <TableCell
                                                sx={(theme) => ({
                                                    color: theme.palette.text.secondary,
                                                    borderBottom: "none",
                                                })}
                                            >
                                                {project.domain || "-"}
                                            </TableCell>
                                        )}
                                        {isMd && (
                                            <TableCell
                                                sx={(theme) => ({
                                                    color: theme.palette.text.secondary,
                                                    borderBottom: "none",
                                                })}
                                            >
                                                {formatDate(project.start_date)}
                                            </TableCell>
                                        )}
                                        {isMd && (
                                            <TableCell
                                                sx={(theme) => ({
                                                    color: theme.palette.text.secondary,
                                                    borderBottom: "none",
                                                })}
                                            >
                                                {project.end_date ? formatDate(project.end_date) : "Present"}
                                            </TableCell>
                                        )}
                                        {(onEdit || onRemove) && (
                                            <TableCell align="right" sx={{ borderBottom: "none" }}>
                                                <Button
                                                    sx={{
                                                        textTransform: "none",
                                                        fontWeight: "400",
                                                        fontSize: "1rem",
                                                        minWidth: "auto",
                                                        padding: "4px",
                                                    }}
                                                    onClick={(e) => handleMenuOpen(e, project)}
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                    {(project.description || (project.responsibilities && project.responsibilities.length > 0)) && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={
                                                    isMd
                                                        ? onEdit || onRemove
                                                            ? 5
                                                            : 4
                                                        : onEdit || onRemove
                                                            ? 2
                                                            : 1
                                                }
                                                sx={(theme) => ({
                                                    color: theme.palette.text.secondary,
                                                    paddingTop: 0,
                                                    paddingBottom: 2,
                                                })}
                                            >
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
            <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                {onEdit && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
                {onRemove && <MenuItem onClick={handleRemove}>Remove</MenuItem>}
            </Menu>
        </Box>
    );
};
