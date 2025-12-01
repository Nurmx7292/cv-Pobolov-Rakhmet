import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";
import { useCvs, type CvListItem } from "@entities/cv";
import { CvsActionMenu } from "../CvsActionMenu/CvsActionMenu";

type SortKey = "name" | "email" | null;
type SortDirection = "asc" | "desc";

interface CvsTableProps {
    userId?: string;
    onDelete?: (cv: CvListItem) => void;
}

export const CvsTable = ({ userId, onDelete }: CvsTableProps) => {
    const { data, loading, error } = useCvs();
    const [searchString, setSearchString] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: null,
        direction: "asc",
    });

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

    const filteredAndSortedCvs = useMemo(() => {
        if (!data?.cvs) return [];

        let filtered = data.cvs;

        if (userId) {
            filtered = filtered.filter((cv) => cv.user?.id === userId);
        }

        if (searchString) {
            const searchLower = searchString.toLowerCase();
            filtered = filtered.filter(
                (cv) =>
                    cv.name.toLowerCase().includes(searchLower) ||
                    cv.description.toLowerCase().includes(searchLower),
            );
        }

        if (sortConfig.key) {
            filtered = [...filtered].sort((a, b) => {
                let aValue: string | null = null;
                let bValue: string | null = null;

                if (sortConfig.key === "name") {
                    aValue = a.name;
                    bValue = b.name;
                } else if (sortConfig.key === "email") {
                    aValue = a.user?.email || null;
                    bValue = b.user?.email || null;
                }

                if (aValue === null && bValue === null) return 0;
                if (aValue === null) return 1;
                if (bValue === null) return -1;

                const comparison = aValue.localeCompare(bValue);
                return sortConfig.direction === "asc" ? comparison : -comparison;
            });
        }

        return filtered;
    }, [data?.cvs, userId, searchString, sortConfig]);

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
                    Failed to load CVs: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <TextField
                fullWidth
                placeholder="Search by name or description"
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
                            <TableCell>Education</TableCell>
                            <TableCell
                                onClick={() => handleSort("email")}
                                sx={{
                                    cursor: "pointer",
                                    userSelect: "none",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                Email{getSortIcon("email")}
                            </TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAndSortedCvs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No CVs found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedCvs.map((cv) => (
                                <TableRow key={cv.id} hover>
                                    <TableCell>{cv.name}</TableCell>
                                    <TableCell>{cv.education}</TableCell>
                                    <TableCell>{cv.user?.email || "-"}</TableCell>
                                    <TableCell align="right">
                                        {onDelete && (
                                            <CvsActionMenu
                                                cv={cv}
                                                onDelete={onDelete}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

